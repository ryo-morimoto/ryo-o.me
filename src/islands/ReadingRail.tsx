import { useEffect, useMemo, useState } from 'react';

type Heading = { id: string; text: string; level: number };

function collectHeadings(root: HTMLElement): Heading[] {
  return [...root.querySelectorAll('h2[id], h3[id]')].map((el) => ({
    id: el.id,
    text: el.textContent?.trim() ?? '',
    level: el.tagName === 'H3' ? 3 : 2,
  }));
}

export function ReadingRail({ contentSelector = '#article-body' }: { contentSelector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!(root instanceof HTMLElement)) return;
    setHeadings(collectHeadings(root));

    const targets = [...root.querySelectorAll('h2[id], h3[id]')];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] },
    );
    targets.forEach((t) => observer.observe(t));

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const total = root.scrollHeight - window.innerHeight;
      const traveled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total <= 0 ? 1 : traveled / total);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [contentSelector]);

  const activeLabel = useMemo(
    () => headings.find((h) => h.id === activeId)?.text ?? 'この記事',
    [headings, activeId],
  );

  if (headings.length === 0) {
    return (
      <div className="rail progress-only" style={{ ['--p' as string]: String(progress) }} aria-hidden="true">
        <div className="bar" />
      </div>
    );
  }

  return (
    <>
      <nav className="rail desktop" aria-label="目次" style={{ ['--p' as string]: String(progress) }}>
        <p className="rail-title">On this page</p>
        <div className="track" aria-hidden="true">
          <div className="bar" />
        </div>
        <ol>
          {headings.map((h) => (
            <li key={h.id} data-level={h.level} data-active={h.id === activeId ? 'true' : undefined}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mobile-bar site-chrome">
        <button type="button" className="mobile-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <span className="mobile-progress" style={{ transform: `scaleX(${progress})` }} />
          <span className="mobile-label">{activeLabel}</span>
        </button>
        {open && (
          <ol className="mobile-list">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  data-active={h.id === activeId ? 'true' : undefined}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      <style>{`
        .rail.desktop {
          display: none;
        }
        @media (min-width: 1100px) {
          .rail.desktop {
            display: block;
            position: fixed;
            top: calc(var(--header-h) + 2rem);
            right: max(1.25rem, calc((100vw - 1120px) / 2 - var(--rail-w) - 1rem));
            width: var(--rail-w);
            font-size: 0.82rem;
          }
        }
        .rail-title {
          margin: 0 0 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .track {
          height: 2px;
          background: var(--color-line);
          margin-bottom: 1rem;
          border-radius: 999px;
          overflow: hidden;
        }
        .bar {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          transform: scaleX(var(--p, 0));
          background: var(--color-accent);
          transition: transform 120ms linear;
        }
        .rail ol, .mobile-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.45rem;
        }
        .rail a, .mobile-list a {
          color: var(--color-muted);
          text-decoration: none;
          display: inline-block;
          transition: color var(--duration) var(--ease-out), transform var(--duration) var(--ease-out);
        }
        .rail li[data-level="3"] a { padding-left: 0.75rem; }
        .rail li[data-active="true"] a,
        .mobile-list a[data-active="true"] {
          color: var(--color-accent-deep);
          transform: translateX(2px);
        }
        .progress-only {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 50;
          background: transparent;
        }
        .progress-only .bar {
          height: 2px;
          background: var(--color-accent);
          transform: scaleX(var(--p, 0));
          transform-origin: left center;
        }
        .mobile-bar {
          position: sticky;
          top: var(--header-h);
          z-index: 30;
          margin: 0 0 1.5rem;
        }
        @media (min-width: 1100px) {
          .mobile-bar { display: none; }
        }
        .mobile-toggle {
          width: 100%;
          border: 1px solid var(--color-line);
          background: color-mix(in oklab, var(--color-bg-elevated) 90%, transparent);
          backdrop-filter: blur(8px);
          border-radius: 0.5rem;
          padding: 0.7rem 0.9rem;
          text-align: left;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          font: inherit;
          color: inherit;
        }
        .mobile-progress {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          background: var(--color-accent);
          transform-origin: left center;
        }
        .mobile-label {
          font-size: 0.85rem;
          color: var(--color-ink-soft);
        }
        .mobile-list {
          margin-top: 0.4rem;
          padding: 0.75rem;
          border: 1px solid var(--color-line);
          border-radius: 0.5rem;
          background: var(--color-bg-elevated);
        }
      `}</style>
    </>
  );
}
