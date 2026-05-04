import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const COVERS_DIR = "dist/client/covers";
const FONT_FILES = [
  "node_modules/@fontsource/inter-tight/files/inter-tight-latin-400-normal.woff2",
  "node_modules/@fontsource/inter-tight/files/inter-tight-latin-500-normal.woff2",
  "node_modules/@fontsource/inter-tight/files/inter-tight-latin-700-normal.woff2",
];

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

const svgs = await findSvgs(COVERS_DIR);
console.log(`Rasterizing ${svgs.length} cover SVGs to PNG...`);

await Promise.all(
  svgs.map(async (svgPath) => {
    const svg = await readFile(svgPath, "utf8");
    const resvg = new Resvg(svg, {
      font: {
        fontFiles: FONT_FILES,
        defaultFontFamily: "Inter Tight",
        loadSystemFonts: false,
      },
      fitTo: { mode: "original" },
    });
    const png = resvg.render().asPng();
    const pngPath = svgPath.replace(/\.svg$/, ".png");
    await writeFile(pngPath, png);
  }),
);

console.log(`Wrote ${svgs.length} PNG covers.`);
