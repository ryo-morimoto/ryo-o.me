import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../../lib/content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const payload = posts.map((p) => ({
    id: p.id,
    title: p.data.title,
    description: p.data.description,
    emoji: p.data.emoji,
    tags: p.data.tags,
    date: p.data.date.toISOString(),
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
