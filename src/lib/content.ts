import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export { readingMinutes } from "./reading.ts";

export type Post = CollectionEntry<"posts">;
export type ChangelogEntry = CollectionEntry<"changelog">;
export type ChangelogKind = ChangelogEntry["data"]["kind"];

export const getPublishedPosts = async (): Promise<Post[]> => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
};

export const getChangelog = async (): Promise<ChangelogEntry[]> => {
  const entries = await getCollection("changelog");
  return entries.toSorted(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
};

export const formatDate = (date: Date, locale = "ja-JP"): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

export const estimateWords = (body: string): number =>
  Math.max(
    1,
    Math.round(body.replaceAll(/\s+/gu, " ").trim().split(" ").length)
  );

export const adjacentPosts = (posts: Post[], slug: string) => {
  const index = posts.findIndex((p) => p.id === slug);
  return {
    next: index > 0 ? posts[index - 1] : undefined,
    prev: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
};

export const relatedPosts = (
  posts: Post[],
  current: Post,
  limit = 3
): Post[] => {
  const relatedIds = new Set(current.data.related);
  const byId = posts.filter((p) => p.id !== current.id && relatedIds.has(p.id));
  if (byId.length >= limit) {
    return byId.slice(0, limit);
  }

  const tagSet = new Set(current.data.tags);
  const byTag = posts
    .filter((p) => p.id !== current.id && !relatedIds.has(p.id))
    .map((p) => ({
      post: p,
      score: p.data.tags.filter((t) => tagSet.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .toSorted(
      (a, b) =>
        b.score - a.score ||
        b.post.data.date.valueOf() - a.post.data.date.valueOf()
    )
    .map((x) => x.post);

  return [...byId, ...byTag].slice(0, limit);
};

export const kindLabel: Record<ChangelogKind, string> = {
  life: "Life",
  note: "Note",
  oss: "OSS",
  post: "Post",
  release: "Release",
  talk: "Talk",
};
