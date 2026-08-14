import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

type PostCard = {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  tags: string[];
  date: string;
};

const client = new QueryClient();

function WalkInner({ excludeId }: { excludeId?: string }) {
  const { data = [] } = useQuery({
    queryKey: ['posts-index'],
    queryFn: async () => {
      const res = await fetch('/api/posts.json');
      if (!res.ok) throw new Error('failed');
      return (await res.json()) as PostCard[];
    },
    staleTime: 60_000,
  });

  const pick = useMemo(() => {
    const pool = data.filter((p) => p.id !== excludeId);
    if (pool.length === 0) return undefined;
    const now = new Date();
    const salt = now.getFullYear() * 1000 + now.getMonth() * 40 + now.getDate();
    const season = Math.floor(now.getMonth() / 3);
    return [...pool]
      .map((p, i) => {
        const m = new Date(p.date).getMonth();
        const s = Math.floor(m / 3);
        const seasonScore = s === season ? 3 : 0;
        const tagScore = Math.min(2, p.tags.length);
        const h = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0);
        return { p, score: seasonScore * 10 + tagScore * 3 + ((h + salt + i) % 7) };
      })
      .sort((a, b) => b.score - a.score)[0]?.p;
  }, [data, excludeId]);

  if (!pick) return null;

  return (
    <aside className="serendipity">
      <p className="label">Serendipity Walk</p>
      <a href={`/posts/${pick.id}`}>
        <span className="emoji" aria-hidden="true">
          {pick.emoji ?? '✦'}
        </span>
        <span className="body">
          <span className="title">{pick.title}</span>
          <span className="desc">{pick.description}</span>
        </span>
      </a>
      <style>{`
        .serendipity {
          margin: 3rem 0 0;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-line);
        }
        .label {
          margin: 0 0 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent-deep);
        }
        .serendipity a {
          display: flex;
          gap: 0.9rem;
          text-decoration: none;
          color: inherit;
          align-items: flex-start;
        }
        .emoji { font-size: 1.6rem; line-height: 1; }
        .body { display: grid; gap: 0.25rem; }
        .title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          letter-spacing: -0.02em;
        }
        .desc {
          color: var(--color-ink-soft);
          font-size: 0.95rem;
          max-width: 40ch;
        }
      `}</style>
    </aside>
  );
}

export function SerendipityWalk({ excludeId }: { excludeId?: string }) {
  const [mounted] = useState(true);
  if (!mounted) return null;
  return (
    <QueryClientProvider client={client}>
      <WalkInner excludeId={excludeId} />
    </QueryClientProvider>
  );
}
