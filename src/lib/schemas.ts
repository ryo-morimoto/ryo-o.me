import * as v from 'valibot';

/** YAML frontmatter may already be a Date, or a string/number to coerce. */
const coerceDate = v.pipe(
  v.union([v.date(), v.string(), v.number()]),
  v.transform((input) => (input instanceof Date ? input : new Date(input))),
  v.check((date) => !Number.isNaN(date.valueOf()), 'Invalid date'),
);

export const changelogKind = ['post', 'release', 'talk', 'life', 'note', 'oss'] as const;

export const postsSchema = v.object({
  title: v.string(),
  description: v.string(),
  date: coerceDate,
  updated: v.optional(coerceDate),
  tags: v.optional(v.array(v.string()), []),
  emoji: v.optional(v.string()),
  mood: v.optional(v.string()),
  related: v.optional(v.array(v.string()), []),
  threadOfSelf: v.optional(v.string()),
  draft: v.optional(v.boolean(), false),
});

export const changelogSchema = v.object({
  title: v.string(),
  date: coerceDate,
  kind: v.picklist(changelogKind),
  href: v.optional(v.string()),
  summary: v.optional(v.string()),
});

export type PostData = v.InferOutput<typeof postsSchema>;
export type ChangelogData = v.InferOutput<typeof changelogSchema>;
export type ChangelogKind = (typeof changelogKind)[number];
