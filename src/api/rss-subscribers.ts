import type { Context } from "~/pages/api/[...slugs]";

import { estimateSubscribersFromHistory, type DatedRssFetchRow } from "~/lib/rss-subscribers";

// RSS subscriber estimate. Simpler than the views endpoint on purpose:
//
//   - Source is D1 only (rss_fetches, populated daily by the cron in
//     workers/snapshot-views). Unlike post views, subscriber counts barely
//     move intraday, so there's no "today" merge from CF GraphQL.
//
//   - The estimation logic (UA subscriber claims + unique IPs for direct
//     readers, minus bots and browser clicks) lives in
//     src/lib/rss-subscribers.ts and is unit-tested.
//
// Edge-cached for an hour; the underlying data only changes once a day.

export const getRssSubscribers = async (c: Context) => {
  const headers = { "cache-control": "public, max-age=3600, s-maxage=3600" };
  const db = c.env.VIEWS_DB;
  if (!db) return c.json({ subscribers: 0 }, 200, headers);

  try {
    // Trailing 7-day window: claims and direct readers each take their
    // per-UA max, which keeps the badge stable despite polling cadences
    // and IP rotation. Matches CF's 1-week adaptive retention, so the window
    // is always fully populated once the cron has run for a week.
    const { results } = await db
      .prepare(
        "SELECT date, ua, count, unique_ips FROM rss_fetches " +
          "WHERE date >= (SELECT date(MAX(date), '-6 days') FROM rss_fetches)",
      )
      .all<DatedRssFetchRow>();
    return c.json({ subscribers: estimateSubscribersFromHistory(results ?? []) }, 200, headers);
  } catch (err) {
    console.error("D1 read failed", err);
    return c.json({ subscribers: 0 }, 200, headers);
  }
};
