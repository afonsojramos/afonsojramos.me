type CoverInput = {
  title: string;
  description?: string;
  date: Date;
  wordmark: string;
};

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatDate = (d: Date) => {
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toLowerCase();
  return `${day} ${month} ${d.getFullYear()}`;
};

// Strip subtitle separators so cover shows the punchy headline.
// "Foo: Bar baz qux" -> "Foo".  "Foo - Bar baz" -> "Foo".
const headline = (title: string) => {
  const m = title.match(/^([^:]+?)(:|\s+[-–—]\s+)/);
  return m ? m[1].trim() : title;
};

// Greedy word-wrap by character count; ellipsizes when content exceeds maxLines.
function wrapByChars(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const tentative = current ? `${current} ${word}` : word;
    if (tentative.length > maxChars && current) {
      if (lines.length === maxLines - 1) break;
      lines.push(current);
      current = word;
    } else {
      current = tentative;
    }
  }

  if (current && lines.length < maxLines) lines.push(current);

  const wordsUsed = lines.join(" ").split(/\s+/).length;
  if (wordsUsed < words.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/\s*\S*$/, "")}…`;
  }
  return lines;
}

export function buildCoverSvg({ title, description, date, wordmark }: CoverInput): string {
  const titleLines = wrapByChars(headline(title), 28, 3);
  const descLines = description ? wrapByChars(description, 56, 2) : [];

  const titleStartY = 270;
  const titleLeading = 78;
  const titleEndY = titleStartY + (titleLines.length - 1) * titleLeading;

  const descStartY = titleEndY + 90;
  const descLeading = 40;

  const titleTspans = titleLines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : titleLeading}">${escapeXml(l)}</tspan>`)
    .join("");

  const descTspans = descLines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : descLeading}">${escapeXml(l)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" font-family="Inter Tight, Inter, system-ui, sans-serif">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="80" x2="1200" y2="80"/>
    <line x1="0" y1="550" x2="1200" y2="550"/>
  </g>
  <circle cx="90" cy="108" r="10" fill="#0047ba"/>
  <text x="112" y="115" fill="#a3a3a3" font-size="22" font-weight="500" letter-spacing="0.5">${escapeXml(wordmark)}</text>
  <text x="80" y="${titleStartY}" fill="#ffffff" font-size="64" font-weight="700" letter-spacing="-1.5">${titleTspans}</text>
  ${descLines.length > 0 ? `<text x="80" y="${descStartY}" fill="#a3a3a3" font-size="28" font-weight="400" letter-spacing="-0.3">${descTspans}</text>` : ""}
  <text x="80" y="591" fill="#a3a3a3" font-size="20" font-weight="500" letter-spacing="0.3">${escapeXml(formatDate(date))}</text>
</svg>`;
}
