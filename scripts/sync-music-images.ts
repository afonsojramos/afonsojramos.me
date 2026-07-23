// Downloads every remote image referenced in src/content/music.ts into
// public/music/ as webp and rewrites the file to point at the local copies.
// Idempotent: already-local paths and already-downloaded files are skipped,
// so it is safe to re-run after adding new albums or concerts.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const musicPath = new URL("../src/content/music.ts", import.meta.url);
const outDir = new URL("../public/music/", import.meta.url);

const source = await readFile(musicPath, "utf8");

type Reference = { url: string; title: string };
const references: Reference[] = [];
for (const match of source.matchAll(
  /title:\s*"((?:[^"\\]|\\.)*)"[\s\S]{0,400}?image:\s*"(https:\/\/[^"]+)"/g,
)) {
  references.push({ title: match[1], url: match[2] });
}

const uniqueUrls = [...new Set(references.map((reference) => reference.url))];
console.log(`Found ${references.length} image references (${uniqueUrls.length} unique).`);

const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[̀-ͯ]/g, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "") || "image";

const taken = new Map<string, string>();
const filenameFor = (reference: Reference) => {
  const base = slugify(reference.title);
  let candidate = base;
  for (
    let suffix = 2;
    taken.get(candidate) && taken.get(candidate) !== reference.url;
    suffix += 1
  ) {
    candidate = `${base}-${suffix}`;
  }
  if (taken.has(candidate)) return `${candidate}.webp`;
  taken.set(candidate, reference.url);
  return `${candidate}.webp`;
};

const titlesByUrl = new Map<string, string>();
for (const reference of references) {
  if (!titlesByUrl.has(reference.url)) titlesByUrl.set(reference.url, reference.title);
}

await mkdir(outDir, { recursive: true });

let downloaded = 0;
let failed = 0;
const localPaths = new Map<string, string>();

const queue = [...uniqueUrls];
const worker = async () => {
  for (let url = queue.pop(); url; url = queue.pop()) {
    const filename = filenameFor({ url, title: titlesByUrl.get(url) ?? "image" });
    const target = join(outDir.pathname, filename);
    localPaths.set(url, `/music/${filename}`);

    try {
      await sharp(target).stats(); // exists already?
      continue;
    } catch {
      // not downloaded yet
    }

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "afonsojramos.me image sync (contact: afonsojorgeramos@gmail.com)",
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      await sharp(buffer)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(target);
      downloaded += 1;
    } catch (error) {
      failed += 1;
      localPaths.delete(url);
      console.warn(`✗ ${url} — ${error instanceof Error ? error.message : error}`);
    }
  }
};
await Promise.all(Array.from({ length: 8 }, worker));

let rewritten = source;
for (const [url, localPath] of localPaths) {
  rewritten = rewritten.replaceAll(`"${url}"`, `"${localPath}"`);
}
await writeFile(musicPath, rewritten);

console.log(
  `Done: ${downloaded} downloaded, ${uniqueUrls.length - downloaded - failed} already local, ${failed} failed.`,
);
