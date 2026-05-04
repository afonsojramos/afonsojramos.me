export const prerender = true;

import { type CollectionEntry, getCollection } from "astro:content";
import { SITE } from "~/consts";
import { buildCoverSvg } from "~/lib/cover";

export async function getStaticPaths() {
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft);
  return projects.map((project) => ({ params: { slug: project.id }, props: project }));
}

export async function GET({ props }: { props: CollectionEntry<"projects"> }) {
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
