import { defineMiddleware } from "astro:middleware";
import { CFP_GATED_PATHS } from "~/lib/auth/constants";
import { getTemplate } from "~/lib/auth/template";
import { getCookieKeyValue } from "~/lib/auth/utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  const { pathname, searchParams } = url;
  const { error } = Object.fromEntries(searchParams);
  const cookie = request.headers.get("cookie") || "";
  const { env } = context.locals.runtime;

  const password = env.CFP_PASSWORD || process.env.CFP_PASSWORD;

  if (!password) {
    return next();
  }

  const cookieKeyValue = await getCookieKeyValue(password);

  if (
    cookie.includes(cookieKeyValue) ||
    pathname === "/cfp_login" ||
    !CFP_GATED_PATHS.includes(pathname)
  ) {
    return next();
  }

  // No cookie or incorrect hash - show login page
  return new Response(getTemplate({ redirectPath: pathname, withError: error === "1" }), {
    headers: {
      "content-type": "text/html",
      "cache-control": "no-cache",
    },
  });
});
