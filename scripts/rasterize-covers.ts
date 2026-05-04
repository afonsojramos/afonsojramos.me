import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
// @ts-expect-error - wawoff2 has no types
import wawoff from "wawoff2";

const COVERS_DIR = "dist/client/covers";
const FONT_WEIGHTS = [400, 500, 700];
const FONT_SOURCE = (weight: number) =>
  `node_modules/@fontsource/inter-tight/files/inter-tight-latin-${weight}-normal.woff2`;

// resvg-js 2.x can't read woff/woff2 directly, so decompress the bundled fonts to TTF first.
async function prepareFonts(): Promise<string[]> {
  const cacheDir = join(tmpdir(), "afonsojramos-covers-fonts");
  await mkdir(cacheDir, { recursive: true });

  return Promise.all(
    FONT_WEIGHTS.map(async (weight) => {
      const ttfPath = join(cacheDir, `inter-tight-${weight}.ttf`);
      const woff2 = await readFile(FONT_SOURCE(weight));
      const ttf = await wawoff.decompress(woff2);
      await writeFile(ttfPath, ttf);
      return ttfPath;
    }),
  );
}

async function findSvgs(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return findSvgs(path);
      if (entry.name.endsWith(".svg")) return [path];
      return [];
    }),
  );
  return files.flat();
}

const fontFiles = await prepareFonts();
const svgs = await findSvgs(COVERS_DIR);
console.log(`Rasterizing ${svgs.length} cover SVGs to PNG...`);

await Promise.all(
  svgs.map(async (svgPath) => {
    const svg = await readFile(svgPath, "utf8");
    const resvg = new Resvg(svg, {
      font: {
        fontFiles,
        defaultFontFamily: "Inter Tight",
        loadSystemFonts: false,
      },
      fitTo: { mode: "original" },
    });
    const png = resvg.render().asPng();
    await writeFile(svgPath.replace(/\.svg$/, ".png"), png);
  }),
);

console.log(`Wrote ${svgs.length} PNG covers.`);
