import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/content';
import { site } from '../lib/site';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const items = posts
    .map(
      (post) => `  <item>
    <title><![CDATA[${post.data.title}]]></title>
    <link>${site.url}/posts/${post.id}</link>
    <guid isPermaLink="true">${site.url}/posts/${post.id}</guid>
    <description><![CDATA[${post.data.description}]]></description>
    <pubDate>${post.data.date.toUTCString()}</pubDate>
  </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${site.name}</title>
  <link>${site.url}</link>
  <description>${site.description}</description>
  <language>ja</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
