import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { Hono, type Context as HonoContext } from "hono";
import type { BlankInput } from "hono/types";
import { getNowPlaying, getTopTracks } from "~/api/lastfm";
import { getViews } from "~/api/views";

type Bindings = {
  LASTFM_API_KEY: string;
  CF_ZONE_TAG?: string;
  CF_ANALYTICS_TOKEN?: string;
  VIEWS_DB?: D1Database;
};

export interface Context extends HonoContext<{ Bindings: Bindings }, string, BlankInput> {}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app
  .get("/now-playing", async (c) => getNowPlaying(c))
  .get("/top-tracks", async (c) => getTopTracks(c))
  .get("/views/:slug{.+}", async (c) => getViews(c));

const handle: APIRoute = async ({ request }) => app.fetch(request, { ...env });

export const GET = handle;
export const POST = handle;
