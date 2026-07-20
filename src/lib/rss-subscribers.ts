// RSS subscriber estimation from a day's worth of /rss.xml fetches
// (rss_fetches rows: per-UA fetch count + distinct client IPs).
//
// There is no exact subscriber number: readers poll the feed repeatedly, and
// hosted readers fetch once on behalf of many users. The estimate combines
// the two signals available in the user agent:
//
//   1. Hosted readers self-report their totals, e.g.
//        Feedly/1.0 (+http://www.feedly.com/fetcher.html; 123 subscribers; ...)
//        Feedbin feed-id:12345 - 45 subscribers
//      We take those numbers at face value.
//
//   2. Direct readers (FreshRSS, NetNewsWire, Miniflux, ...) report no
//      count, so we approximate one subscriber per distinct client IP.
//      Imperfect both ways (NAT undercounts, multi-device overcounts), but
//      it's the accepted approximation.
//
// Bots, monitors, and humans who clicked the feed link in a browser are
// excluded. The estimate is deliberately conservative: when in doubt, don't
// count.
export interface RssFetchRow {
  ua: string;
  count: number;
  unique_ips: number;
}

export interface DatedRssFetchRow extends RssFetchRow {
  date: string; // 'YYYY-MM-DD' UTC
}

// "123 subscribers", "1 subscriber", "1,234 subscribers". Matches Feedly,
// Inoreader, Feedbin, NewsBlur, Feedfetcher-Google, Feedspot, and friends.
const SUBSCRIBER_CLAIM = /(\d[\d,]*)\s+subscribers?\b/i;

// Hits that are never subscriptions: crawlers, SEO bots, uptime monitors,
// feed validators, and generic HTTP libraries (scripted polls are usually
// monitoring, not reading).
const NON_READER =
  /bot\b|crawler|spider|slurp|scrape|indexer|monitor|uptime|pingdom|validator|archiver|facebookexternalhit|whatsapp|curl|wget|httpclient|go-http-client|python|scrapy/i;

// Desktop/mobile browsers fetch the feed when a human clicks the link, which
// is a page view, not a subscription. Self-hosted readers that ride on a
// Mozilla-compatible UA always name themselves, so they survive this cut via
// SELF_NAMED_READER below.
const BROWSER = /mozilla\/\d/i;
const SELF_NAMED_READER =
  /rss|feed|news|inoreader|feedly|feedbin|miniflux|netnewswire|reeder|freshrss|akregator|liferea|newsboat|fluent ?reader|commafeed|selfoss|greader|readeck|follow\.is|antennaPod/i;

const classify = (row: RssFetchRow): { claim: number } | { direct: true } | null => {
  const claim = SUBSCRIBER_CLAIM.exec(row.ua);
  if (claim) return { claim: Number.parseInt(claim[1].replaceAll(",", ""), 10) };
  if (NON_READER.test(row.ua)) return null;
  if (BROWSER.test(row.ua) && !SELF_NAMED_READER.test(row.ua)) return null;
  if (row.ua.trim() === "") return null;
  return { direct: true };
};

/**
 * Estimate subscriber count from one day of per-UA feed fetch stats.
 * Pure and deterministic so it stays unit-testable; the API layer just
 * supplies rows from D1.
 */
export function estimateSubscribers(rows: RssFetchRow[]): number {
  let total = 0;
  for (const row of rows) {
    const klass = classify(row);
    if (klass === null) continue;
    total += "claim" in klass ? klass.claim : row.unique_ips;
  }
  return total;
}

/**
 * Estimate from a trailing multi-day window. A single day is jittery at
 * small numbers (readers poll on different cadences, IPs rotate), so:
 *
 *   - subscriber claims take the MAX per UA across the window (they are
 *     stable cumulative totals, and polling gaps shouldn't zero them out);
 *   - direct readers take the MAX daily unique-IP count per UA (a reader
 *     who shows up any day this week counts once, not once per day), then
 *     sum across UAs.
 */
export function estimateSubscribersFromHistory(rows: DatedRssFetchRow[]): number {
  const claims = new Map<string, number>();
  const directPerUa = new Map<string, number>();
  for (const row of rows) {
    const klass = classify(row);
    if (klass === null) continue;
    if ("claim" in klass) {
      // Key on the UA with the claim itself stripped: the count moves day to
      // day ("...; 5 subscribers" vs "...; 6 subscribers"), and we want the
      // latest/max per reader, not a sum of every observed count.
      const key = row.ua.replace(SUBSCRIBER_CLAIM, "");
      claims.set(key, Math.max(claims.get(key) ?? 0, klass.claim));
    } else {
      directPerUa.set(row.ua, Math.max(directPerUa.get(row.ua) ?? 0, row.unique_ips));
    }
  }
  let total = 0;
  for (const n of claims.values()) total += n;
  for (const n of directPerUa.values()) total += n;
  return total;
}
