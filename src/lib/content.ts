import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type ChangelogEntry = CollectionEntry<'changelog'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getChangelog(): Promise<ChangelogEntry[]> {
  const entries = await getCollection('changelog');
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, locale = 'ja-JP'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function readingMinutes(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_\-\`\[\]()]/g, ' ')
    .replace(/\s+/g, '');
  const chars = [...text].length;
  return Math.max(1, Math.ceil(chars / 500));
}

export function estimateWords(body: string): number {
  return Math.max(1, Math.round(body.replace(/\s+/g, ' ').trim().split(' ').length));
}

export function adjacentPosts(posts: Post[], slug: string) {
  const index = posts.findIndex((p) => p.id === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export function relatedPosts(posts: Post[], current: Post, limit = 3): Post[] {
  const relatedIds = new Set(current.data.related);
  const byId = posts.filter((p) => p.id !== current.id && relatedIds.has(p.id));
  if (byId.length >= limit) return byId.slice(0, limit);

  const tagSet = new Set(current.data.tags);
  const byTag = posts
    .filter((p) => p.id !== current.id && !relatedIds.has(p.id))
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => tagSet.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .map((x) => x.post);

  return [...byId, ...byTag].slice(0, limit);
}

export const kindLabel: Record<string, string> = {
  post: 'Post',
  release: 'Release',
  talk: 'Talk',
  life: 'Life',
  note: 'Note',
  oss: 'OSS',
};
