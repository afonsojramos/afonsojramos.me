export const prerender = true;

import { getCollection } from "astro:content";
import { HOME, SITE } from "~/consts";

type Context = {
  site: URL;
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET(context: Context) {
  const blog = (await getCollection("blog")).filter((post) => !post.data.draft);
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft);

  const items = [...blog, ...projects].sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );

  const updated = items[0]?.data.date ?? new Date();
  const siteUrl = context.site.href.replace(/\/$/, "");

  const entries = items
    .map((item) => {
      const link = `${siteUrl}/${item.collection}/${item.id}/`;
      const date = new Date(item.data.date).toISOString();
      return `  <entry>
    <title>${escapeXml(item.data.title)}</title>
    <link href="${link}"/>
    <id>${link}</id>
    <updated>${date}</updated>
    <published>${date}</published>
    <summary>${escapeXml(item.data.description)}</summary>
  </entry>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(HOME.title)}</title>
  <subtitle>${escapeXml(HOME.description)}</subtitle>
  <link href="${siteUrl}/atom.xml" rel="self"/>
  <link href="${siteUrl}/"/>
  <id>${siteUrl}/</id>
  <updated>${new Date(updated).toISOString()}</updated>
  <author>
    <name>${escapeXml(SITE.name)}</name>
    <email>${escapeXml(SITE.email)}</email>
    <uri>${siteUrl}/</uri>
  </author>
${entries}
</feed>`;

  return new Response(body, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
