// Build-time fetchers for hover-card previews. Everything degrades to null
// on failure so a network hiccup at build time never breaks a page; callers
// fall back to rendering the plain link.

const USER_AGENT = "afonsojramos.me hover cards";

export type GitHubStats = {
  followers: number;
  contributions: number;
  /** Last ~18 weeks of contribution levels (0-4), week-major order. */
  levels: number[];
};

type ContributionsApiResponse = {
  total?: { lastYear?: number };
  contributions?: Array<{ date: string; count: number; level: number }>;
};

// The heatmap data comes from the community contributions API; GitHub's own
// calendar page (github.com/users/:u/contributions) is the fallback, but it
// is flaky and frequently 502s.
async function getContributionCalendar(
  username: string,
): Promise<{ contributions: number; levels: number[] } | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { headers: { "User-Agent": USER_AGENT } },
    );
    if (response.ok) {
      const data = (await response.json()) as ContributionsApiResponse;
      const levels = (data.contributions ?? []).map((day) => day.level).slice(-7 * 18);
      if (data.total?.lastYear && levels.length > 0) {
        return { contributions: data.total.lastYear, levels };
      }
    }
  } catch {
    // fall through to the HTML scrape
  }

  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!response.ok) return null;
    const html = await response.text();
    const contributions = Number(
      html.match(/([\d,]+) contributions? in the last year/)?.[1]?.replaceAll(",", ""),
    );
    const levels = [...html.matchAll(/data-level="(\d)"/g)]
      .map((match) => Number(match[1]))
      .slice(-7 * 18);
    if (!contributions || levels.length === 0) return null;
    return { contributions, levels };
  } catch {
    return null;
  }
}

export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const [userResponse, calendar] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { "User-Agent": USER_AGENT },
      }),
      getContributionCalendar(username),
    ]);
    if (!userResponse.ok || !calendar) return null;

    const user = (await userResponse.json()) as { followers?: number };
    if (!user.followers) return null;
    return { followers: user.followers, ...calendar };
  } catch {
    return null;
  }
}

export type BlueskyProfile = {
  name: string;
  handle: string;
  avatar?: string;
  description?: string;
  followers: number;
  following: number;
};

export async function getBlueskyProfile(handle: string): Promise<BlueskyProfile | null> {
  try {
    const response = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(handle)}`,
      { headers: { "User-Agent": USER_AGENT } },
    );
    if (!response.ok) return null;

    const profile = (await response.json()) as {
      displayName?: string;
      handle: string;
      avatar?: string;
      description?: string;
      followersCount?: number;
      followsCount?: number;
    };
    if (!profile.handle) return null;

    return {
      name: profile.displayName ?? profile.handle,
      handle: profile.handle,
      avatar: profile.avatar,
      description: profile.description,
      followers: profile.followersCount ?? 0,
      following: profile.followsCount ?? 0,
    };
  } catch {
    return null;
  }
}

export type OgPreview = {
  title: string;
  domain: string;
  image?: string;
};

const googleFavicon = (hostname: string) =>
  `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;

const isReachable = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD", headers: { "User-Agent": USER_AGENT } });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Best-effort favicon for a site: apple-touch-icon first (highest
 * resolution), then any rel=icon link, then Google's favicon service,
 * which always returns a PNG. Returns null only if the URL is malformed.
 */
export async function getFaviconUrl(pageUrl: string): Promise<string | null> {
  let hostname: string;
  try {
    hostname = new URL(pageUrl).hostname;
  } catch {
    return null;
  }

  try {
    const response = await fetch(pageUrl, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      redirect: "follow",
    });
    if (response.ok) {
      const html = await response.text();
      const candidates: Array<{ href: string; score: number }> = [];
      for (const match of html.matchAll(
        /<link[^>]+rel=["']([^"']*(?:icon|apple-touch-icon)[^"']*)["'][^>]*>/gi,
      )) {
        const href = match[0].match(/href=["']([^"']+)["']/i)?.[1];
        if (!href) continue;
        const rel = match[1].toLowerCase();
        candidates.push({
          href: new URL(href, response.url).href,
          score: rel.includes("apple-touch-icon") ? 0 : rel.includes("svg") ? 1 : 2,
        });
      }
      candidates.sort((a, b) => a.score - b.score);
      for (const candidate of candidates) {
        if (await isReachable(candidate.href)) return candidate.href;
      }
    }
  } catch {
    // fall through to the Google service
  }

  return googleFavicon(hostname);
}

const decodeEntities = (value: string) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const metaContent = (html: string, property: string) => {
  const raw =
    html.match(
      new RegExp(
        `<meta[^>]+(?:property|name)=["'](?:og:)?${property}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
    )?.[1] ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:)?${property}["']`,
        "i",
      ),
    )?.[1];
  return raw ? decodeEntities(raw) : undefined;
};

export async function getOgPreview(url: string): Promise<OgPreview | null> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      redirect: "follow",
    });
    if (!response.ok) return null;

    const html = await response.text();
    const title =
      metaContent(html, "title") ?? html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim();
    if (!title) return null;

    return {
      title,
      domain: new URL(url).hostname.replace(/^www\./, ""),
      image: metaContent(html, "image"),
    };
  } catch {
    return null;
  }
}
