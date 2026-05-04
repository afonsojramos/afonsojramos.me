export const prerender = true;

import { type CollectionEntry, getCollection } from "astro:content";
import { SITE } from "~/consts";
import { buildCoverSvg } from "~/lib/cover";

export async function getStaticPaths() {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: post }));
}

export async function GET({ props }: { props: CollectionEntry<"blog"> }) {
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
