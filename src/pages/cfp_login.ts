import type { APIRoute } from "astro";
import { CFP_COOKIE_MAX_AGE } from "../lib/auth/constants";
import { getCookieKeyValue, sha256 } from "../lib/auth/utils";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const formData = await request.formData();
  const password = formData.get("password")?.toString();
  const redirectPath = formData.get("redirect")?.toString() || "/";

  // Validate redirect is same-origin to prevent open redirects
  try {
    const redirectUrl = new URL(redirectPath, request.url);
    if (redirectUrl.origin !== new URL(request.url).origin) {
      return redirect("/login");
    }
  } catch {
    // If URL parsing fails, redirect must be relative path
    if (!redirectPath.startsWith("/")) {
      return redirect("/login");
    }
  }

  if (!password) {
    return redirect(`/login?error=1&redirect=${encodeURIComponent(redirectPath)}`);
  }

  // Access environment variable from Cloudflare runtime or build-time fallback
  const cfpPassword = locals.runtime?.env?.CFP_PASSWORD || process.env.CFP_PASSWORD;

  if (!cfpPassword) {
    return redirect(redirectPath);
  }

  const hashedPassword = await sha256(password);
  const hashedCfpPassword = await sha256(cfpPassword);

  if (hashedPassword === hashedCfpPassword) {
    const cookieKeyValue = await getCookieKeyValue(cfpPassword);
    return new Response(JSON.stringify({ success: true, redirect: redirectPath }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; SameSite=Strict; HttpOnly; Secure`,
        "Cache-Control": "no-cache",
        Location: redirectPath,
      },
    });
  }

  return new Response(JSON.stringify({ success: false, error: "Invalid password" }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
};
