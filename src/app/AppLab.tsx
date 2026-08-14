import {
  Outlet,
  Link,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Shell() {
  return (
    <div className="lab">
      <header>
        <p className="eyebrow">Experimental surface</p>
        <h1>小さな実験場</h1>
        <nav>
          <Link to="/app">Overview</Link>
          <Link to="/app/walk">Serendipity</Link>
        </nav>
      </header>
      <Outlet />
      <style>{`
        .lab { max-width: 40rem; }
        .eyebrow {
          margin: 0 0 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent-deep);
        }
        .lab h1 {
          margin: 0 0 1rem;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw + 1rem, 2.4rem);
        }
        .lab nav {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .lab nav a {
          text-decoration: none;
          color: var(--color-ink-soft);
          font-size: 0.95rem;
        }
        .lab nav a[data-status="active"] {
          color: var(--color-accent-deep);
        }
      `}</style>
    </div>
  );
}

function Overview() {
  return (
    <section>
      <p>
        Astro が本体、ここは TanStack Router + Query の島。将来の検索やメモ同期を置く場所として空けてあります。
      </p>
      <p>いまは Serendipity のプレビューだけが動きます。</p>
    </section>
  );
}

function WalkPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['posts-index'],
    queryFn: async () => {
      const res = await fetch('/api/posts.json');
      if (!res.ok) throw new Error('failed');
      return (await res.json()) as Array<{
        id: string;
        title: string;
        description: string;
        emoji?: string;
      }>;
    },
  });

  if (isLoading) return <p>読み込み中…</p>;

  return (
    <section>
      <p className="hint">今日の候補（人気順ではありません）</p>
      <ul>
        {data.slice(0, 5).map((p) => (
          <li key={p.id}>
            <a href={`/posts/${p.id}`}>
              <span aria-hidden="true">{p.emoji ?? '·'} </span>
              {p.title}
            </a>
          </li>
        ))}
      </ul>
      <style>{`
        .hint { color: var(--color-muted); }
        ul { list-style: none; padding: 0; display: grid; gap: 0.75rem; }
        a { text-decoration: none; color: inherit; font-family: var(--font-display); font-size: 1.15rem; }
      `}</style>
    </section>
  );
}

const rootRoute = createRootRoute({
  component: Shell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: Overview,
});

const walkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/walk',
  component: WalkPage,
});

const routeTree = rootRoute.addChildren([indexRoute, walkRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppLab() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
