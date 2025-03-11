import { getNowPlaying, getTopTracks } from "@/api/lastfm";
import { Elysia } from "elysia";
const app = new Elysia({ prefix: "/api", aot: false });

app.get("/now-playing", getNowPlaying).get("/top-tracks", getTopTracks);

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
