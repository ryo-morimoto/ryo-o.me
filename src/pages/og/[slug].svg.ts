import type { APIRoute } from "astro";

import { getPublishedPosts } from "../../lib/content";
import { site } from "../../lib/site";

export const prerender = true;

export const getStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return [
    { params: { slug: "default" } },
    ...posts.map((post) => ({ params: { slug: post.id } })),
  ];
};

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? "default";
  const posts = await getPublishedPosts();
  const post = posts.find((p) => p.id === slug);

  const title = post?.data.title ?? site.name;
  const description = post?.data.description ?? site.description;
  const mark = post?.data.emoji ?? "✦";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef2f4"/>
      <stop offset="55%" stop-color="#d9e6ea"/>
      <stop offset="100%" stop-color="#e8efe8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="90" r="180" fill="#d6ebe7" opacity="0.8"/>
  <text x="96" y="140" font-size="64">${mark}</text>
  <text x="96" y="280" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#1c2428">${escapeXml(title.slice(0, 42))}</text>
  <text x="96" y="360" font-family="system-ui, sans-serif" font-size="28" fill="#3d4a52">${escapeXml(description.slice(0, 80))}</text>
  <text x="96" y="560" font-family="Georgia, serif" font-size="28" fill="#0a4a45">${escapeXml(site.name)}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
};
