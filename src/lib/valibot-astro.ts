import { z } from 'astro/zod';
import * as v from 'valibot';
import { getDotPath } from 'valibot';

/**
 * Astro collections type `schema` as Zod and generate JSON Schema via `z.toJSONSchema`.
 * Keep Valibot as the source of truth; this host schema only satisfies Astro's loader.
 */
export function toAstroCollectionSchema<const TSchema extends v.GenericSchema>(schema: TSchema) {
  return z.any().transform((input, ctx) => {
    const result = v.safeParse(schema, input);
    if (result.success) return result.output;

    for (const issue of result.issues) {
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: (getDotPath(issue) ?? '').split('.').filter(Boolean),
      });
    }
    return z.NEVER;
  });
}
