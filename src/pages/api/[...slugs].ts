import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { createWebHandler } from "blockrate";
import { Hono, type Context as HonoContext } from "hono";
import type { BlankInput } from "hono/types";
import { getNowPlaying, getTopTracks } from "~/api/lastfm";
import { getViews } from "~/api/views";

type Bindings = {
  LASTFM_API_KEY: string;
  CF_ZONE_TAG?: string;
  CF_ANALYTICS_TOKEN?: string;
  VIEWS_DB?: D1Database;
  BLOCKRATE_API_KEY?: string;
};

export interface Context extends HonoContext<{ Bindings: Bindings }, string, BlankInput> {}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

// First-party blockrate reporter: the browser posts here (same origin), and
// this route forwards to blockrate.app with the server-side API key. Posting
// to blockrate.app directly from the client would invert the measurement the
// moment that domain lands on a blocklist. Unset key → 204 no-op (local dev).
let blockRateHandler: ((request: Request) => Promise<Response>) | null | undefined;

app
  .get("/now-playing", async (c) => getNowPlaying(c))
  .get("/top-tracks", async (c) => getTopTracks(c))
  .get("/views/:slug{.+}", async (c) => getViews(c))
  .post("/block-rate", async (c) => {
    if (blockRateHandler === undefined) {
      const apiKey = c.env.BLOCKRATE_API_KEY;
      try {
        blockRateHandler = apiKey ? createWebHandler({ forward: { apiKey } }) : null;
      } catch (err) {
        console.error("[blockrate] handler construction failed — check BLOCKRATE_API_KEY", err);
        blockRateHandler = null;
      }
    }
    return blockRateHandler ? blockRateHandler(c.req.raw) : c.body(null, 204);
  });

const handle: APIRoute = async ({ request }) => app.fetch(request, { ...env });

export const GET = handle;
export const POST = handle;
