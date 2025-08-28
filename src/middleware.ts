import { defineMiddleware } from "astro:middleware";
import { CFP_COOKIE_MAX_AGE, CFP_GATED_PATHS } from "~/lib/auth/constants";
import { getTemplate } from "~/lib/auth/template";
import { getCookieKeyValue, sha256 } from "~/lib/auth/utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  const { pathname, searchParams } = url;
  const { error, password: urlPassword } = Object.fromEntries(searchParams);
  const cookie = request.headers.get("cookie") || "";
  const { env } = context.locals.runtime;

  const cfpPassword = env.CFP_PASSWORD || process.env.CFP_PASSWORD;

  if (!cfpPassword) {
    return next();
  }

  const cookieKeyValue = await getCookieKeyValue(cfpPassword);

  // Check if already authenticated via cookie, or accessing login page, or path not gated
  if (
    cookie.includes(cookieKeyValue) ||
    pathname === "/cfp_login" ||
    !CFP_GATED_PATHS.includes(pathname)
  ) {
    return next();
  }

  // Check if password provided in URL parameter
  if (urlPassword) {
    const hashedUrlPassword = await sha256(urlPassword);
    const hashedCfpPassword = await sha256(cfpPassword);

    if (hashedUrlPassword === hashedCfpPassword) {
      // Set authentication cookie and redirect to clean URL
      const response = new Response("", {
        status: 302,
        headers: {
          "Set-Cookie": `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
          "Cache-Control": "no-cache",
          Location: pathname, // Redirect to same path without password parameter
        },
      });
      return response;
    }
  }

  // No cookie or incorrect hash - show login page
  return new Response(getTemplate({ redirectPath: pathname, withError: error === "1" }), {
    headers: {
      "content-type": "text/html",
      "cache-control": "no-cache",
    },
  });
});
