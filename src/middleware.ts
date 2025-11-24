import { defineMiddleware } from "astro:middleware";
import { CFP_COOKIE_MAX_AGE, CFP_GATED_PATHS } from "~/lib/auth/constants";
import { getCookieKeyValue, sha256 } from "~/lib/auth/utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, redirect, locals } = context;
  const pathname = url.pathname;
  const cookie = request.headers.get("cookie") || "";

  // Check if this path requires authentication
  const isGatedPath = CFP_GATED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!isGatedPath || pathname === "/cfp_login" || pathname === "/login") {
    return next();
  }

  // Access environment variable from Cloudflare runtime or build-time fallback
  const cfpPassword = locals.runtime?.env?.CFP_PASSWORD || process.env.CFP_PASSWORD;

  if (!cfpPassword) {
    return next();
  }

  const cookieKeyValue = await getCookieKeyValue(cfpPassword);

  // Check if already authenticated via cookie
  if (cookie.includes(cookieKeyValue)) {
    return next();
  }

  // Check if password provided in URL parameter
  const passwordParam = url.searchParams.get("password");
  if (passwordParam) {
    const hashedPassword = await sha256(passwordParam);
    const hashedCfpPassword = await sha256(cfpPassword);

    if (hashedPassword === hashedCfpPassword) {
      // Set authentication cookie and redirect to clean URL
      url.searchParams.delete("password");
      return new Response(null, {
        status: 302,
        headers: {
          Location: url.pathname + (url.search || ""),
          "Set-Cookie": `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; SameSite=Strict; HttpOnly; Secure`,
          "Cache-Control": "no-cache",
        },
      });
    }
  }

  // Redirect to login page
  return redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
});
