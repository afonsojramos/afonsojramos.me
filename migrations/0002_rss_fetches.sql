-- rss_fetches: per-day, per-user-agent snapshot of /rss.xml 200 hits from
-- Cloudflare's httpRequestsAdaptiveGroups, written daily by the cron in
-- workers/snapshot-views. `count` is raw fetches; `unique_ips` is the number
-- of distinct client IPs seen for that UA on that day. CF's adaptive groups
-- have no uniq aggregate, so the worker groups by (userAgent, clientIP) and
-- counts distinct IPs itself.
--
-- The API (src/api/rss-subscribers.ts) turns a day's rows into a subscriber
-- estimate: hosted readers self-report "N subscribers" in their UA, and
-- direct readers are approximated by unique IPs. Raw rows are kept (rather
-- than a precomputed estimate) so the estimation logic can evolve without
-- re-pulling analytics that CF may no longer retain.
CREATE TABLE IF NOT EXISTS rss_fetches (
  date TEXT NOT NULL,                         -- 'YYYY-MM-DD' UTC
  ua TEXT NOT NULL,                           -- client user agent ('' if absent)
  count INTEGER NOT NULL CHECK (count >= 0),  -- feed fetches that day
  unique_ips INTEGER NOT NULL CHECK (unique_ips >= 0),
  PRIMARY KEY (date, ua)
);

CREATE INDEX IF NOT EXISTS rss_fetches_by_date ON rss_fetches (date);
