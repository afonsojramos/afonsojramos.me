import { defineMiddleware } from "astro:middleware";
import { env } from "cloudflare:workers";
import { getCookieKeyValue } from "~/lib/auth/utils";
import { edgeCacheFetch, isEdgeCacheablePath } from "~/lib/http/edge-cache";
import {
  isGatedPath,
  isPrivateResponsePath,
  withPrivateResponseHeaders,
} from "~/lib/http/private-response";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, redirect } = context;
  const pathname = url.pathname;
  const cookie = request.headers.get("cookie") || "";

  const gatedPath = isGatedPath(pathname);
  const privateResponse = isPrivateResponsePath(pathname);

  const nextWithResponsePolicy = async () => {
    const response = await next();
    return privateResponse ? withPrivateResponseHeaders(response) : response;
  };

  if (!gatedPath) {
    if (request.method === "GET" && !privateResponse && isEdgeCacheablePath(pathname)) {
      return edgeCacheFetch(context, nextWithResponsePolicy);
    }
    return nextWithResponsePolicy();
  }

  const cfpPassword = env.CFP_PASSWORD || process.env.CFP_PASSWORD;

  if (!cfpPassword) {
    return nextWithResponsePolicy();
  }

  const cookieKeyValue = await getCookieKeyValue(cfpPassword);

  // Check if already authenticated via cookie
  if (cookie.includes(cookieKeyValue)) {
    return nextWithResponsePolicy();
  }

  // Redirect to login page
  return withPrivateResponseHeaders(redirect(`/login?redirect=${encodeURIComponent(pathname)}`));
});
