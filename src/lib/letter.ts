import { z } from 'astro/zod';
import { letterStampIds } from './site.ts';

export const letterBodySchema = z.object({
  postId: z
    .string()
    .trim()
    .min(1, '記事を指定してください')
    .max(128, '記事を指定してください')
    .regex(/^[a-z0-9][a-z0-9-]*$/, '記事を指定してください'),
  stamp: z.enum(letterStampIds, { error: 'スタンプを選んでください' }),
});

export type LetterBody = z.infer<typeof letterBodySchema>;

export function letterClientError(error: z.ZodError): string {
  const paths = new Set(error.issues.map((issue) => String(issue.path[0] ?? '')));
  if (paths.has('stamp')) return 'スタンプを選んでください';
  if (paths.has('postId')) return '記事を指定してください';
  return '不正なリクエストです';
}
