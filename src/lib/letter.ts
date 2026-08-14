import * as v from 'valibot';
import { letterStampIds } from './site';

export const letterBodySchema = v.object({
  postId: v.pipe(v.string(), v.trim(), v.nonEmpty('スタンプを選んでください')),
  stamp: v.picklist(letterStampIds, 'スタンプを選んでください'),
});

export type LetterBody = v.InferOutput<typeof letterBodySchema>;
