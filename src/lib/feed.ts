import type { CollectionEntry } from "astro:content";
import { Marked } from "marked";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/afonsojramos/afonsojramos.me/main/src/content";

const marked = new Marked({ async: false });

type FeedEntry = CollectionEntry<"blog"> | CollectionEntry<"projects">;

// Renders the post body to HTML and rewrites relative image paths
// (e.g. ./screenshot.png or screenshot.png) to absolute GitHub raw URLs
// so feed readers can load them.
export function renderEntryToHtml(entry: FeedEntry): string {
  const html = marked.parse(entry.body ?? "") as string;
  const sourceBase = `${GITHUB_RAW_BASE}/${entry.collection}/${entry.id}`;
  return html.replace(
    /(<img[^>]*\ssrc=)"(?!https?:\/\/|\/)(?:\.\/)?([^"]+)"/g,
    `$1"${sourceBase}/$2"`,
  );
}
