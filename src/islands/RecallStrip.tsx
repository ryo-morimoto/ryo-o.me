import { useEffect, useState } from 'react';

const keyFor = (postId: string) => `oshian:recall:${postId}`;

export function RecallStrip({ postId }: { postId: string }) {
  const [value, setValue] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(localStorage.getItem(keyFor(postId)) ?? '');
  }, [postId]);

  return (
    <section className="recall" aria-label="3行で言うと">
      <h2>3行で言うと？</h2>
      <p className="hint">任意です。あなたの言葉だけが、この端末に残ります。</p>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        placeholder="この記事を、自分の言葉で短くすると…"
      />
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(keyFor(postId), value);
          setSaved(true);
        }}
      >
        この端末に残す
      </button>
      {saved && (
        <p className="ok" role="status">
          残しました。
        </p>
      )}
      <style>{`
        .recall {
          margin: 2.5rem 0;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-line);
        }
        .recall h2 { margin: 0 0 0.35rem; font-size: 1.1rem; }
        .hint, .ok { margin: 0 0 0.75rem; color: var(--color-muted); font-size: 0.9rem; }
        .ok { color: var(--color-accent-deep); }
        textarea {
          width: 100%;
          border: 1px solid var(--color-line);
          border-radius: 0.5rem;
          padding: 0.8rem;
          font: inherit;
          background: var(--color-bg-elevated);
          color: inherit;
          resize: vertical;
          margin-bottom: 0.6rem;
        }
        button {
          border: 1px solid var(--color-line);
          background: transparent;
          border-radius: 999px;
          padding: 0.4rem 0.85rem;
          font: inherit;
          cursor: pointer;
          color: var(--color-ink-soft);
        }
      `}</style>
    </section>
  );
}
