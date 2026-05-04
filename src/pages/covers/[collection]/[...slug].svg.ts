export const prerender = true;

import { type CollectionEntry, getCollection } from "astro:content";
import { SITE } from "~/consts";
import { buildCoverSvg } from "~/lib/cover";

type CoverableEntry = CollectionEntry<"blog"> | CollectionEntry<"projects">;

export async function getStaticPaths() {
  const blog = (await getCollection("blog")).filter((post) => !post.data.draft);
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft);

  return [...blog, ...projects].map((entry) => ({
    params: { collection: entry.collection, slug: entry.id },
    props: entry,
  }));
}

export async function GET({ props }: { props: CoverableEntry }) {
  const svg = buildCoverSvg({
    title: props.data.title,
    description: props.data.description,
    date: new Date(props.data.date),
    wordmark: SITE.website.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
