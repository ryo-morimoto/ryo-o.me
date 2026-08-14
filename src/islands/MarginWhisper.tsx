import { useEffect, useState } from 'react';

const keyFor = (postId: string, blockId: string) => `oshian:whisper:${postId}:${blockId}`;

export function MarginWhisper({ postId }: { postId: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const root = document.querySelector('#article-body');
    if (!(root instanceof HTMLElement)) return;
    const paras = [...root.querySelectorAll('p')].slice(0, 12);
    paras.forEach((p, i) => {
      if (p.dataset.whisperReady) return;
      p.dataset.whisperReady = '1';
      p.classList.add('whisper-host');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'whisper-trigger';
      btn.textContent = '?';
      btn.setAttribute('aria-label', 'なぜ？メモを開く');
      const id = `p-${i}`;
      btn.addEventListener('click', () => {
        setOpenId(id);
        setDraft(localStorage.getItem(keyFor(postId, id)) ?? '');
      });
      p.appendChild(btn);
    });
  }, [postId]);

  if (!openId) return null;

  return (
    <div className="whisper-panel" role="dialog" aria-label="なぜ？メモ">
      <p className="label">なぜ、これは真か？ / 自分ならどう接続するか</p>
      <textarea rows={4} value={draft} onChange={(e) => setDraft(e.target.value)} />
      <div className="actions">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(keyFor(postId, openId), draft);
            setOpenId(null);
          }}
        >
          残す
        </button>
        <button type="button" className="ghost" onClick={() => setOpenId(null)}>
          閉じる
        </button>
      </div>
      <style>{`
        .whisper-panel {
          position: fixed;
          right: 1rem;
          bottom: 4.5rem;
          width: min(22rem, calc(100vw - 2rem));
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-line);
          border-radius: 0.75rem;
          padding: 1rem;
          z-index: 60;
          box-shadow: 0 12px 40px color-mix(in oklab, var(--color-ink) 8%, transparent);
        }
        .label {
          margin: 0 0 0.5rem;
          font-size: 0.85rem;
          color: var(--color-ink-soft);
        }
        textarea {
          width: 100%;
          border: 1px solid var(--color-line);
          border-radius: 0.5rem;
          padding: 0.65rem;
          font: inherit;
          background: white;
          color: inherit;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.6rem;
        }
        .actions button {
          border: 1px solid var(--color-line);
          background: var(--color-accent-soft);
          border-radius: 999px;
          padding: 0.35rem 0.8rem;
          font: inherit;
          cursor: pointer;
        }
        .actions .ghost { background: transparent; }
      `}</style>
    </div>
  );
}
