-- views: per-day, per-path snapshot of HTML 200 hits from Cloudflare's
-- httpRequestsAdaptiveGroups. The cron worker (workers/snapshot-views) writes
-- yesterday's totals here. The API endpoint sums over `path` for "lifetime up
-- to yesterday EOD UTC" and adds today's count from CF GraphQL on read.
--
-- Historical backfills (Firebase pre-Umami era, Umami Oct-2025-onwards) live
-- as one-off rows on dates the cron never touches, so they coexist with daily
-- snapshots without colliding on the (date, path) PK.
CREATE TABLE IF NOT EXISTS views (
  date TEXT NOT NULL,                         -- 'YYYY-MM-DD' UTC
  path TEXT NOT NULL,                         -- e.g. '/blog/accidental-homelab/'
  count INTEGER NOT NULL CHECK (count >= 0),
  PRIMARY KEY (date, path)
);

CREATE INDEX IF NOT EXISTS views_by_path ON views (path);
