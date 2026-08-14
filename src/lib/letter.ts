import { z } from 'astro/zod';
import { letterStampIds } from './site';

export const letterBodySchema = z.object({
  postId: z.string().trim().min(1),
  stamp: z.enum(letterStampIds),
});

export type LetterBody = z.infer<typeof letterBodySchema>;
