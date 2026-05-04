import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const stripIndex = (path: string) => path.replace(/\/index$/, "");

const generateId = ({ entry }: { entry: string }) => stripIndex(entry.replace(/\.(md|mdx)$/, ""));

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
