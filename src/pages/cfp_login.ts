import type { APIRoute } from "astro";
import { CFP_COOKIE_MAX_AGE } from "../lib/auth/constants";
import { getCookieKeyValue, sha256 } from "../lib/auth/utils";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get("password")?.toString() || "";
  const redirect = formData.get("redirect")?.toString() || "/";

  const cfpPassword = import.meta.env.CFP_PASSWORD || process.env.CFP_PASSWORD;

  if (!cfpPassword) {
    return new Response("", {
      status: 302,
      headers: {
        "Cache-Control": "no-cache",
        Location: redirect,
      },
    });
  }

  const hashedPassword = await sha256(password);
  const hashedCfpPassword = await sha256(cfpPassword);

  if (hashedPassword === hashedCfpPassword) {
    // set cookie and redirect
    const cookieKeyValue = await getCookieKeyValue(cfpPassword);

    return new Response("", {
      status: 302,
      headers: {
        "Set-Cookie": `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
        "Cache-Control": "no-cache",
        Location: redirect,
      },
    });
  }

  return new Response("", {
    status: 302,
    headers: {
      "Cache-Control": "no-cache",
      Location: `${redirect}?error=1`,
    },
  });
};
