// Edge caching for Worker-computed GET responses via the Cache API.
//
// Custom-domain Workers bypass Cloudflare's CDN cache, so the s-maxage our
// API routes and /_image send only reaches browsers. This layer stores those
// responses in the zone cache (caches.default), which honors the response's
// own cache-control, so each route keeps controlling its lifetime.

import type { APIContext } from "astro";

const CACHEABLE_PREFIXES = ["/_image", "/api/"];

export function isEdgeCacheablePath(pathname: string): boolean {
  return CACHEABLE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isCacheable(response: Response): boolean {
  if (!response.ok || response.headers.has("set-cookie")) return false;
  const cacheControl = response.headers.get("cache-control") ?? "";
  return /(?:s-maxage|max-age)=[1-9]/.test(cacheControl) && !/private|no-store/.test(cacheControl);
}

type RuntimeLocals = {
  cfContext?: { waitUntil?: (promise: Promise<unknown>) => void };
};

export async function edgeCacheFetch(
  context: APIContext,
  next: () => Promise<Response>,
): Promise<Response> {
  // Typed against the DOM lib here; Cloudflare's CacheStorage adds `default`.
  const cache = (globalThis.caches as unknown as { default?: Cache } | undefined)?.default;
  if (!cache) return next();

  const cacheKey = new Request(context.url.href, { method: "GET" });

  const hit = await cache.match(cacheKey).catch(() => undefined);
  if (hit) {
    const response = new Response(hit.body, hit);
    response.headers.set("x-edge-cache", "hit");
    return response;
  }

  const response = await next();
  if (!isCacheable(response)) return response;

  const cfContext = (context.locals as RuntimeLocals).cfContext;
  const store = cache.put(cacheKey, response.clone()).catch(() => {});
  if (cfContext?.waitUntil) cfContext.waitUntil(store);
  else await store;

  const tagged = new Response(response.body, response);
  tagged.headers.set("x-edge-cache", "miss");
  return tagged;
}
