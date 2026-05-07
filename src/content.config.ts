import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const stripIndex = (path: string) => path.replace(/\/index$/, "");

// Prefer frontmatter `slug` when present (matches the pre-May-2026 routing
// inherited from Astro's legacy `type: "content"` collections — keeps old
// URLs and external links alive). Fall back to the file-path-derived id.
const generateId = ({ entry, data }: { entry: string; data: Record<string, unknown> }) => {
  if (typeof data.slug === "string" && data.slug.length > 0) return data.slug;
  return stripIndex(entry.replace(/\.(md|mdx)$/, ""));
};

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

const work = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/work",
    generateId,
  }),
  schema: z.object({
    company: z.string(),
    url: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
    tags: z.array(z.string()),
    shortDescription: z.string(),
  }),
});

const education = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/education",
    generateId,
  }),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional(),
      demoURL: z.string().optional(),
      repoURL: z.string().optional(),
      tags: z.array(z.string()).optional(),
      icon: image().optional(),
      iconBackground: z.string().optional(),
    }),
});

export const collections = { blog, work, education, projects };
