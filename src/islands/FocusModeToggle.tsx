import { useEffect, useState } from 'react';

const KEY = 'oshian:focus-mode';

export function FocusModeToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY) === '1';
    setOn(saved);
    document.body.classList.toggle('is-focus-mode', saved);
  }, []);

  useEffect(() => {
    const toggle = () => {
      setOn((prev) => {
        const next = !prev;
        document.body.classList.toggle('is-focus-mode', next);
        sessionStorage.setItem(KEY, next ? '1' : '0');
        return next;
      });
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <button
      type="button"
      className="focus-btn site-chrome"
      onClick={() => {
        setOn((prev) => {
          const next = !prev;
          document.body.classList.toggle('is-focus-mode', next);
          sessionStorage.setItem(KEY, next ? '1' : '0');
          return next;
        });
      }}
      aria-pressed={on}
      title="Focus mode (R)"
    >
      {on ? 'Exit focus' : 'Focus'}
      <kbd>R</kbd>
      <style>{`
        .focus-btn {
          position: fixed;
          left: 1rem;
          bottom: 1rem;
          z-index: 45;
          border: 1px solid var(--color-line);
          background: color-mix(in oklab, var(--color-bg-elevated) 92%, transparent);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 0.55rem 0.85rem;
          display: inline-flex;
          gap: 0.45rem;
          align-items: center;
          font-size: 0.8rem;
          color: var(--color-ink-soft);
          cursor: pointer;
          font-family: var(--font-body);
          transition: opacity var(--duration) var(--ease-out), transform var(--duration) var(--ease-out);
        }
        .focus-btn kbd {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          border: 1px solid var(--color-line);
          border-radius: 0.3rem;
          padding: 0.05rem 0.3rem;
        }
        .focus-btn[aria-pressed="true"] {
          color: var(--color-accent-deep);
          border-color: color-mix(in oklab, var(--color-accent) 35%, transparent);
        }
      `}</style>
    </button>
  );
}
