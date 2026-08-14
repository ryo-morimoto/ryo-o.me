import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    emoji: z.string().optional(),
    mood: z.string().optional(),
    related: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    threadOfSelf: z.string().optional(),
    title: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date(),
    href: z.string().optional(),
    kind: z.enum(["post", "release", "talk", "life", "note", "oss"]),
    summary: z.string().optional(),
    title: z.string(),
  }),
});

export const collections = { changelog, posts };
