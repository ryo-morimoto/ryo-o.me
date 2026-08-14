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

/** Lightweight serendipity: season + tag distance + weekday salt (no popularity). */
export function pickSerendipity(posts: Post[], excludeId?: string): Post | undefined {
  const pool = posts.filter((p) => p.id !== excludeId);
  if (pool.length === 0) return undefined;

  const now = new Date();
  const season = Math.floor(now.getMonth() / 3);
  const daySalt = now.getFullYear() * 1000 + now.getMonth() * 40 + now.getDate();

  const scored = pool.map((p, i) => {
    const month = p.data.date.getMonth();
    const postSeason = Math.floor(month / 3);
    const seasonScore = postSeason === season ? 3 : Math.abs(postSeason - season) === 2 ? 1 : 0;
    const tagScore = Math.min(2, p.data.tags.length);
    const hash = (hashString(p.id) + daySalt + i * 17) % 97;
    return { post: p, score: seasonScore * 10 + tagScore * 3 + (hash % 7) };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.post;
}

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export const kindLabel: Record<string, string> = {
  post: 'Post',
  release: 'Release',
  talk: 'Talk',
  life: 'Life',
  note: 'Note',
  oss: 'OSS',
};
