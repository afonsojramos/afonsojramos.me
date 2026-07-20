import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  estimateSubscribers,
  estimateSubscribersFromHistory,
  type DatedRssFetchRow,
  type RssFetchRow,
} from "../src/lib/rss-subscribers";

const row = (ua: string, count = 1, uniqueIps = 1): RssFetchRow => ({
  ua,
  count,
  unique_ips: uniqueIps,
});

describe("rss subscriber estimate", () => {
  test("takes hosted readers' self-reported subscriber counts", () => {
    const rows = [
      row(
        "Feedly/1.0 (+http://www.feedly.com/fetcher.html; 123 subscribers; like FeedFetcher-Google)",
        4,
        1,
      ),
      row("Inoreader/1.0 (+http://www.inoreader.com/feed-fetcher; 7 subscribers; )", 4, 1),
      row("Feedbin feed-id:12345 - 45 subscribers", 2, 1),
      row("NewsBlur Feed Fetcher - 3 subscribers (http://www.newsblur.com)", 2, 1),
    ];
    assert.equal(estimateSubscribers(rows), 178);
  });

  test("parses comma-formatted and singular claims", () => {
    assert.equal(estimateSubscribers([row("Feedly/1.0 (...; 1,234 subscribers; ...)")]), 1234);
    assert.equal(estimateSubscribers([row("Feedly/1.0 (...; 1 subscriber; ...)")]), 1);
  });

  test("counts direct readers by unique IPs, not fetches", () => {
    const rows = [
      row("FreshRSS/1.29.1 (Linux; https://freshrss.org)", 24, 1),
      row("NetNewsWire/6.1 (Macintosh; macOS 15.0)", 48, 2),
    ];
    assert.equal(estimateSubscribers(rows), 3);
  });

  test("excludes bots, crawlers, monitors, and http libraries", () => {
    const rows = [
      row("Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot)"),
      row("YandoriRSSBot/3.0 (Go)"),
      row("UptimeRobot/2.0; http://www.uptimerobot.com/"),
      row("curl/8.7.1"),
      row("Go-http-client/2.0"),
      row("python-requests/2.32.3"),
    ];
    assert.equal(estimateSubscribers(rows), 0);
  });

  test("excludes humans clicking the feed link in a browser", () => {
    const rows = [
      row(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
      ),
      row(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      ),
    ];
    assert.equal(estimateSubscribers(rows), 0);
  });

  test("keeps self-named readers on Mozilla-compatible agents", () => {
    const rows = [row("Mozilla/5.0 (compatible; Miniflux/2.2; +https://miniflux.app)", 12, 1)];
    assert.equal(estimateSubscribers(rows), 1);
  });

  test("skips empty user agents", () => {
    assert.equal(estimateSubscribers([row("", 10, 5)]), 0);
  });

  test("excludes generic scrapers", () => {
    assert.equal(estimateSubscribers([row("scrape_central/1.0")]), 0);
  });

  test("combines claims and direct readers across a full day", () => {
    const rows = [
      row("Feedly/1.0 (+http://www.feedly.com/fetcher.html; 2 subscribers; ...)", 3, 1),
      row("Feedly/1.0;", 3, 3),
      row("FreshRSS/1.29.1 (Linux; https://freshrss.org)", 12, 1),
      row("DotBot/1.1", 1, 1),
      row("Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) Version/13.0", 1, 1),
    ];
    assert.equal(estimateSubscribers(rows), 6);
  });
});

describe("rss subscriber estimate over a trailing window", () => {
  const dated = (date: string, ua: string, count = 1, uniqueIps = 1): DatedRssFetchRow => ({
    date,
    ...row(ua, count, uniqueIps),
  });

  test("takes the max claim per UA, not the per-day sum", () => {
    const rows = [
      dated("2026-07-14", "Feedly/1.0 (...; 5 subscribers; ...)"),
      dated("2026-07-15", "Feedly/1.0 (...; 6 subscribers; ...)"),
      dated("2026-07-16", "Feedly/1.0 (...; 6 subscribers; ...)"),
    ];
    assert.equal(estimateSubscribersFromHistory(rows), 6);
  });

  test("counts a daily-polling direct reader once, via the peak day", () => {
    const rows = [
      dated("2026-07-14", "FreshRSS/1.29.1 (Linux; https://freshrss.org)", 24, 1),
      dated("2026-07-15", "FreshRSS/1.29.1 (Linux; https://freshrss.org)", 24, 1),
      dated("2026-07-16", "FreshRSS/1.29.1 (Linux; https://freshrss.org)", 24, 1),
    ];
    assert.equal(estimateSubscribersFromHistory(rows), 1);
  });

  test("keeps readers who only appear on some days", () => {
    const rows = [
      dated("2026-07-14", "FreshRSS/1.29.1 (Linux; https://freshrss.org)", 24, 1),
      dated("2026-07-16", "NetNewsWire/6.1 (Macintosh)", 12, 1),
    ];
    assert.equal(estimateSubscribersFromHistory(rows), 2);
  });

  test("combines windowed claims and direct readers", () => {
    const rows = [
      dated("2026-07-15", "Inoreader/1.0 (...; 2 subscribers; )", 3, 1),
      dated("2026-07-16", "Inoreader/1.0 (...; 2 subscribers; )", 3, 1),
      dated("2026-07-15", "FreshRSS/1.29.1 (Linux; https://freshrss.org)", 12, 1),
      dated("2026-07-16", "Feedly/1.0;", 2, 2),
      dated("2026-07-16", "GPTBot/1.4", 1, 1),
    ];
    // Inoreader claim (2) + FreshRSS (1 IP) + Feedly/1.0; (2 IPs), bot excluded.
    assert.equal(estimateSubscribersFromHistory(rows), 5);
  });
});
