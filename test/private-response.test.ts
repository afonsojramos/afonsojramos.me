import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  isGatedPath,
  isPrivateResponsePath,
  withPrivateResponseHeaders,
} from "../src/lib/http/private-response";

describe("private response policy", () => {
  for (const pathname of ["/work", "/work/role", "/login", "/cfp_login"]) {
    test(`classifies ${pathname} as private`, () => {
      assert.equal(isPrivateResponsePath(pathname), true);
    });
  }

  for (const pathname of ["/", "/blog", "/api/now-playing", "/projects/zlar"]) {
    test(`leaves ${pathname} public`, () => {
      assert.equal(isPrivateResponsePath(pathname), false);
    });
  }

  test("keeps the authentication boundary separate from utility routes", () => {
    assert.equal(isGatedPath("/work"), true);
    assert.equal(isGatedPath("/login"), false);
  });

  test("overrides weaker cache headers while preserving the response", async () => {
    const response = withPrivateResponseHeaders(
      new Response("streamed body", {
        status: 202,
        headers: {
          "Cache-Control": "public, max-age=300",
          "Content-Type": "text/plain",
        },
      }),
    );

    assert.equal(response.status, 202);
    assert.equal(response.headers.get("Cache-Control"), "private, no-store");
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow, noarchive");
    assert.match(response.headers.get("Content-Type") ?? "", /text\/plain/);
    assert.equal(await response.text(), "streamed body");
  });
});
