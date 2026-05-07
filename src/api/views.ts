import type { Context } from "~/pages/api/[...slugs]";

// Per-post view counts. Two data sources merged:
//
//   1. D1 (`views` table) — lifetime up to yesterday EOD UTC. Populated daily
//      by the cron in workers/snapshot-views, plus historical backfill rows
//      (Firebase pre-2025 + Umami Oct-2025-onwards imports).
//
//   2. Cloudflare GraphQL Analytics — today's count (last ~24h).
//      CF Free plan caps each httpRequestsAdaptiveGroups query at a 1-day
//      window, which is precisely the freshness gap D1's daily snapshot
//      leaves behind. The two sources stitch together cleanly.
//
// Edge-cached for 5 minutes so we don't hammer either source on hot pages.

const CF_GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

const TODAY_QUERY = `
query Today($zoneTag: string!, $path: string!, $since: Time!) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      httpRequestsAdaptiveGroups(
        limit: 1
        filter: {
          datetime_geq: $since
          clientRequestPath: $path
          edgeResponseStatus: 200
        }
      ) {
        count
      }
    }
  }
}`;

interface CFAnalyticsResponse {
  data?: {
    viewer?: {
      zones?: Array<{
        httpRequestsAdaptiveGroups?: Array<{ count: number }>;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

function normalizePath(slug: string): string {
  const withSlash = slug.startsWith("/") ? slug : `/${slug}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

async function fetchTodayFromCloudflare(c: Context, path: string): Promise<number> {
  const zoneTag = c.env.CF_ZONE_TAG;
  const token = c.env.CF_ANALYTICS_TOKEN;
  if (!zoneTag || !token) return 0;

  // 1-day window cap on Free plan; subtract a safety margin.
  const since = new Date(Date.now() - 23 * 60 * 60 * 1000 - 50 * 60 * 1000).toISOString();

  try {
    const response = await fetch(CF_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: TODAY_QUERY,
        variables: { zoneTag, path, since },
      }),
    });

    if (!response.ok) {
      console.error("CF Analytics HTTP error", response.status, await response.text());
      return 0;
    }

    const data = (await response.json()) as CFAnalyticsResponse;
    if (data.errors?.length) {
      console.error("CF Analytics GraphQL errors", data.errors);
      return 0;
    }

    return data.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups?.[0]?.count ?? 0;
  } catch (err) {
    console.error("CF Analytics fetch failed", err);
    return 0;
  }
}

async function fetchLifetimeFromD1(c: Context, path: string): Promise<number> {
  const db = c.env.VIEWS_DB;
  if (!db) return 0;
  try {
    const row = await db
      .prepare("SELECT COALESCE(SUM(count), 0) AS total FROM views WHERE path = ?1")
      .bind(path)
      .first<{ total: number }>();
    return row?.total ?? 0;
  } catch (err) {
    console.error("D1 read failed", err);
    return 0;
  }
}

export const getViews = async (c: Context) => {
  const slug = c.req.param("slug");
  if (!slug) {
    return c.json({ error: "missing slug" }, 400);
  }

  const path = normalizePath(slug);

  const [lifetime, today] = await Promise.all([
    fetchLifetimeFromD1(c, path),
    fetchTodayFromCloudflare(c, path),
  ]);

  return c.json({ views: lifetime + today, lifetime, today }, 200, {
    "cache-control": "public, max-age=300, s-maxage=300",
  });
};
