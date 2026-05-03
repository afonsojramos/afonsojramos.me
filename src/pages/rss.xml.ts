export const prerender = true;

import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { HOME, SITE } from "~/consts";
import { renderEntryToHtml } from "~/lib/feed";

type Context = {
  site: URL;
};

export async function GET(context: Context) {
  const blog = (await getCollection("blog")).filter((post) => !post.data.draft);

  const projects = (await getCollection("projects")).filter((project) => !project.data.draft);

  const items = [...blog, ...projects].sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );

  const renderedItems = await Promise.all(
    items.map(async (item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.id}/`,
      content: await renderEntryToHtml(item, context.site),
    })),
  );

  return rss({
    title: SITE.name,
    description: HOME.description,
    site: context.site,
    items: renderedItems,
  });
}
