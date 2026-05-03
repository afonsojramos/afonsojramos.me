import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";

type FeedEntry = CollectionEntry<"blog"> | CollectionEntry<"projects">;

// Astro's content layer stores extra fields on entries that aren't on the public type.
type EntryInternals = {
  rendered?: { html: string };
  filePath?: string;
};

// Eagerly load every content image so we can resolve <img __ASTRO_IMAGE_="..."> placeholders
// emitted by Astro's markdown pipeline back into proper <img src="..."> tags.
const imageImports = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/**/*.{png,jpg,jpeg,webp,gif,avif,svg}",
  { eager: true },
);
const imageByPath = new Map(Object.entries(imageImports).map(([path, mod]) => [path, mod.default]));

const HTML_ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&apos;": "'",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
};
const decodeHtmlEntities = (s: string) =>
  s.replace(/&(?:#x([0-9a-f]+)|#(\d+)|quot|apos|amp|lt|gt);/gi, (match, hex, dec) => {
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    if (dec) return String.fromCodePoint(Number.parseInt(dec, 10));
    return HTML_ENTITIES[match.toLowerCase()] ?? match;
  });

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PLACEHOLDER_RE = /<img\s+__ASTRO_IMAGE_="([^"]+)">/g;

type AstroImagePayload = { src: string; alt?: string; index?: number };

async function resolvePlaceholder(
  payload: AstroImagePayload,
  entryDir: string,
  siteUrl: URL,
): Promise<string> {
  const srcRel = payload.src.replace(/^\.\//, "");
  const lookupKey = `/${entryDir}/${srcRel}`;
  const imageMeta = imageByPath.get(lookupKey);
  const alt = payload.alt ?? "";
  if (!imageMeta) return `<img alt="${escapeAttr(alt)}">`;

  const result = await getImage({ src: imageMeta, alt });
  const absolute = new URL(result.src, siteUrl).href;
  return `<img src="${escapeAttr(absolute)}" alt="${escapeAttr(alt)}">`;
}

export async function renderEntryToHtml(entry: FeedEntry, siteUrl: URL): Promise<string> {
  const internals = entry as FeedEntry & EntryInternals;
  const baseHtml = internals.rendered?.html ?? "";
  const filePath = internals.filePath;
  if (!baseHtml || !filePath) return baseHtml;

  const entryDir = filePath.replace(/\/[^/]+$/, "");
  const placeholders = [...baseHtml.matchAll(PLACEHOLDER_RE)];
  if (placeholders.length === 0) return baseHtml;

  const replacements = await Promise.all(
    placeholders.map(async (match) => {
      try {
        const payload = JSON.parse(decodeHtmlEntities(match[1])) as AstroImagePayload;
        const html = await resolvePlaceholder(payload, entryDir, siteUrl);
        return { match: match[0], html };
      } catch {
        return { match: match[0], html: "" };
      }
    }),
  );

  let html = baseHtml;
  for (const { match, html: replacement } of replacements) {
    html = html.replace(match, replacement);
  }
  return html;
}
