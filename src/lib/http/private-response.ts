import { CFP_GATED_PATHS } from "../auth/constants";

export const PRIVATE_RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
} as const;

const PRIVATE_UTILITY_PATHS = ["/login", "/cfp_login"] as const;

function matchesPath(pathname: string, path: string): boolean {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function isGatedPath(pathname: string): boolean {
  return CFP_GATED_PATHS.some((path) => matchesPath(pathname, path));
}

export function isPrivateResponsePath(pathname: string): boolean {
  return isGatedPath(pathname) || PRIVATE_UTILITY_PATHS.some((path) => matchesPath(pathname, path));
}

export function withPrivateResponseHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(PRIVATE_RESPONSE_HEADERS)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
