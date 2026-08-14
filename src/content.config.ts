import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    emoji: z.string().optional(),
    mood: z.string().optional(),
    related: z.array(z.string()).default([]),
    threadOfSelf: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["post", "release", "talk", "life", "note", "oss"]),
    href: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { posts, changelog };
