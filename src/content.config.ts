import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { changelogSchema, postsSchema } from './lib/schemas';
import { toAstroCollectionSchema } from './lib/valibot-astro';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: toAstroCollectionSchema(postsSchema),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/changelog' }),
  schema: toAstroCollectionSchema(changelogSchema),
});

export const collections = { posts, changelog };
