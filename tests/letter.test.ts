import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { letterBodySchema, letterClientError } from '../src/lib/letter.ts';

describe('letterBodySchema', () => {
  it('accepts a slug postId and known stamp', () => {
    const parsed = letterBodySchema.safeParse({ postId: 'edge-quiet-stack', stamp: 'read' });
    assert.equal(parsed.success, true);
    if (parsed.success) {
      assert.equal(parsed.data.postId, 'edge-quiet-stack');
      assert.equal(parsed.data.stamp, 'read');
    }
  });

  it('rejects a missing stamp with the stamp message', () => {
    const parsed = letterBodySchema.safeParse({ postId: 'edge-quiet-stack' });
    assert.equal(parsed.success, false);
    if (!parsed.success) {
      assert.equal(letterClientError(parsed.error), 'スタンプを選んでください');
    }
  });

  it('rejects an empty postId with the post message', () => {
    const parsed = letterBodySchema.safeParse({ postId: '  ', stamp: 'read' });
    assert.equal(parsed.success, false);
    if (!parsed.success) {
      assert.equal(letterClientError(parsed.error), '記事を指定してください');
    }
  });

  it('rejects a path-like postId', () => {
    const parsed = letterBodySchema.safeParse({ postId: '../etc/passwd', stamp: 'read' });
    assert.equal(parsed.success, false);
    if (!parsed.success) {
      assert.equal(letterClientError(parsed.error), '記事を指定してください');
    }
  });
});
