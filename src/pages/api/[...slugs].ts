import type { APIRoute } from "astro";
import { Hono, type Context as HonoContext } from "hono";
import type { BlankInput } from "hono/types";
import { getNowPlaying, getTopTracks } from "~//api/lastfm";

type Bindings = {
  LASTFM_API_KEY: string;
};

export interface Context extends HonoContext<{ Bindings: Bindings }, string, BlankInput> {}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app
  .get("/now-playing", async (c) => getNowPlaying(c))
  .get("/top-tracks", async (c) => getTopTracks(c));

const handle: APIRoute = async ({ request, locals }) =>
  app.fetch(request, { ...locals.runtime.env });

export const GET = handle;
export const POST = handle;
