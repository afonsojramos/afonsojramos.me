// Cron-triggered worker that snapshots yesterday's analytics from
// Cloudflare's GraphQL API into D1. Runs daily at 02:30 UTC. Two snapshots:
//
//   1. views: per-path page counts for the view badges.
//   2. rss_fetches: /rss.xml fetches grouped by user agent, with distinct
//      client IPs per UA, for the RSS subscriber estimate.
//
// Idempotent: both tables use (date, ...) as PK and ON CONFLICT REPLACE so a
// re-run on the same day overwrites yesterday's rows with the latest counts
// (CF's analytics can take a couple of hours to finalize, so even a same-day
// re-run is safe).
//
// Path-filtered at write time to keep D1 small — we only care about
// public-facing pages, not /favicon.ico scans, /admin/ probes, etc.

interface Env {
  VIEWS_DB: D1Database;
  CF_ZONE_TAG: string;
  CF_ANALYTICS_TOKEN: string;
}

const CF_GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

const DAILY_QUERY = `
query Daily($zoneTag: string!, $start: Time!, $end: Time!) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      httpRequestsAdaptiveGroups(
        limit: 5000
        filter: {
          datetime_geq: $start
          datetime_lt: $end
          edgeResponseStatus: 200
        }
        orderBy: [count_DESC]
      ) {
        count
        dimensions {
          clientRequestPath
        }
      }
    }
  }
}`;

const RSS_QUERY = `
query Rss($zoneTag: string!, $start: Time!, $end: Time!) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      httpRequestsAdaptiveGroups(
        limit: 5000
        filter: {
          datetime_geq: $start
          datetime_lt: $end
          clientRequestPath_in: ["/rss.xml", "/rss.xml/"]
          edgeResponseStatus: 200
        }
        orderBy: [count_DESC]
      ) {
        count
        dimensions {
          userAgent
          clientIP
        }
      }
    }
  }
}`;

interface DailyResponse {
  data?: {
    viewer?: {
      zones?: Array<{
        httpRequestsAdaptiveGroups?: Array<{
          count: number;
          dimensions: { clientRequestPath: string };
        }>;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

interface RssResponse {
  data?: {
    viewer?: {
      zones?: Array<{
        httpRequestsAdaptiveGroups?: Array<{
          count: number;
          dimensions: { userAgent: string; clientIP: string };
        }>;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

function isPagePath(path: string): boolean {
  if (path === "/") return true;
  if (["/blog", "/blog/", "/work", "/work/", "/music", "/music/"].includes(path)) return true;
  if (path.startsWith("/blog/") && !path.includes(".")) return true;
  if (path.startsWith("/projects/") && !path.includes(".")) return true;
  return false;
}

// Canonical form is trailing-slash. CF records both /work and /work/ as
// separate paths; normalize before upserting so D1 collapses them into one
// row per post and matches the API read-side normalizePath().
function canonicalize(path: string): string {
  if (path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}

function yesterdayUTC(now: Date): { date: string; start: string; end: string } {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
  const date = start.toISOString().slice(0, 10); // YYYY-MM-DD
  return { date, start: start.toISOString(), end: end.toISOString() };
}

async function fetchYesterdayPathCounts(
  env: Env,
  start: string,
  end: string,
): Promise<Map<string, number>> {
  const response = await fetch(CF_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${env.CF_ANALYTICS_TOKEN}`,
    },
    body: JSON.stringify({
      query: DAILY_QUERY,
      variables: { zoneTag: env.CF_ZONE_TAG, start, end },
    }),
  });

  if (!response.ok) {
    throw new Error(`CF Analytics HTTP ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as DailyResponse;
  if (data.errors?.length) {
    throw new Error(`CF Analytics GraphQL: ${data.errors.map((e) => e.message).join("; ")}`);
  }

  const groups = data.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? [];
  const counts = new Map<string, number>();
  for (const group of groups) {
    const raw = group.dimensions.clientRequestPath;
    if (!isPagePath(raw)) continue;
    const path = canonicalize(raw);
    counts.set(path, (counts.get(path) ?? 0) + group.count);
  }
  return counts;
}

async function upsertCounts(env: Env, date: string, counts: Map<string, number>): Promise<number> {
  if (counts.size === 0) return 0;
  const stmt = env.VIEWS_DB.prepare(
    "INSERT INTO views (date, path, count) VALUES (?1, ?2, ?3) " +
      "ON CONFLICT (date, path) DO UPDATE SET count = excluded.count",
  );
  const batch = Array.from(counts.entries()).map(([path, count]) => stmt.bind(date, path, count));
  await env.VIEWS_DB.batch(batch);
  return batch.length;
}

// /rss.xml fetches for yesterday, aggregated per user agent: total fetches
// plus distinct client IPs. Grouping by (userAgent, clientIP) works around
// adaptive groups having no uniq-IP aggregate. The 5000-group cap only
// truncates the long tail of one-off IPs on an unusually hot day, which
// barely moves the subscriber estimate.
async function fetchYesterdayRssFetches(
  env: Env,
  start: string,
  end: string,
): Promise<Map<string, { count: number; ips: Set<string> }>> {
  const response = await fetch(CF_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${env.CF_ANALYTICS_TOKEN}`,
    },
    body: JSON.stringify({
      query: RSS_QUERY,
      variables: { zoneTag: env.CF_ZONE_TAG, start, end },
    }),
  });

  if (!response.ok) {
    throw new Error(`CF Analytics HTTP ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as RssResponse;
  if (data.errors?.length) {
    throw new Error(`CF Analytics GraphQL: ${data.errors.map((e) => e.message).join("; ")}`);
  }

  const groups = data.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups ?? [];
  const perUa = new Map<string, { count: number; ips: Set<string> }>();
  for (const group of groups) {
    const ua = group.dimensions.userAgent ?? "";
    const entry = perUa.get(ua) ?? { count: 0, ips: new Set<string>() };
    entry.count += group.count;
    entry.ips.add(group.dimensions.clientIP);
    perUa.set(ua, entry);
  }
  return perUa;
}

async function upsertRssFetches(
  env: Env,
  date: string,
  perUa: Map<string, { count: number; ips: Set<string> }>,
): Promise<number> {
  if (perUa.size === 0) return 0;
  const stmt = env.VIEWS_DB.prepare(
    "INSERT INTO rss_fetches (date, ua, count, unique_ips) VALUES (?1, ?2, ?3, ?4) " +
      "ON CONFLICT (date, ua) DO UPDATE SET count = excluded.count, unique_ips = excluded.unique_ips",
  );
  const batch = Array.from(perUa.entries()).map(([ua, { count, ips }]) =>
    stmt.bind(date, ua, count, ips.size),
  );
  await env.VIEWS_DB.batch(batch);
  return batch.length;
}

async function snapshot(
  env: Env,
  now: Date,
): Promise<{ date: string; viewRows: number; rssRows: number }> {
  const { date, start, end } = yesterdayUTC(now);
  const [counts, rssFetches] = await Promise.all([
    fetchYesterdayPathCounts(env, start, end),
    fetchYesterdayRssFetches(env, start, end),
  ]);
  const [viewRows, rssRows] = await Promise.all([
    upsertCounts(env, date, counts),
    upsertRssFetches(env, date, rssFetches),
  ]);
  return { date, viewRows, rssRows };
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(
      snapshot(env, new Date())
        .then(({ date, viewRows, rssRows }) =>
          console.log(`snapshot: ${date} → ${viewRows} paths, ${rssRows} rss user agents`),
        )
        .catch((err) => console.error("snapshot failed:", err)),
    );
  },

  // Manual trigger for backfill / testing: GET /?date=YYYY-MM-DD
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");
    const now = dateParam ? new Date(`${dateParam}T12:00:00Z`) : new Date();
    try {
      const result = await snapshot(env, now);
      return Response.json(result);
    } catch (err) {
      return Response.json({ error: String(err) }, { status: 500 });
    }
  },
};
