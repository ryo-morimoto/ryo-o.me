import { useState } from 'react';
import { letterStamps } from '../lib/site';

export function QuietLetter({ postId }: { postId: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function send(stamp: string) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ postId, stamp }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? '送れませんでした');
      }
      setSent(stamp);
    } catch (e) {
      setError(e instanceof Error ? e.message : '送れませんでした');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="quiet-letter" aria-label="感想レター">
      <h2>感想レター</h2>
      <p className="hint">いいねの代わりに、スタンプを一枚だけ。数は公開しません。</p>
      {sent ? (
        <p className="thanks" role="status">
          受け取りました。ありがとう。
        </p>
      ) : (
        <div className="stamps">
          {letterStamps.map((s) => (
            <button key={s.id} type="button" disabled={pending} onClick={() => send(s.id)}>
              <span aria-hidden="true">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
      <style>{`
        .quiet-letter {
          margin: 3rem 0;
          padding: 1.5rem 0;
          border-top: 1px solid var(--color-line);
        }
        .quiet-letter h2 {
          margin: 0 0 0.4rem;
          font-size: 1.1rem;
        }
        .hint, .thanks, .err {
          margin: 0 0 1rem;
          color: var(--color-muted);
          font-size: 0.92rem;
        }
        .thanks { color: var(--color-accent-deep); }
        .err { color: #8a2f2f; }
        .stamps {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .stamps button {
          border: 1px solid var(--color-line);
          background: var(--color-bg-elevated);
          border-radius: 999px;
          padding: 0.45rem 0.8rem;
          display: inline-flex;
          gap: 0.4rem;
          align-items: center;
          cursor: pointer;
          font: inherit;
          color: var(--color-ink-soft);
        }
        .stamps button:hover {
          border-color: color-mix(in oklab, var(--color-accent) 40%, transparent);
          color: var(--color-accent-deep);
        }
        .stamps button:disabled {
          opacity: 0.6;
          cursor: wait;
        }
      `}</style>
    </section>
  );
}
