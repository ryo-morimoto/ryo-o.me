import type { APIRoute } from 'astro';
import * as v from 'valibot';
import { letterBodySchema } from '../../lib/letter';

export const prerender = false;

type Env = {
  DB?: D1Database;
  KV?: KVNamespace;
};

const memoryLetters: Array<{ postId: string; stamp: string; createdAt: string; ip: string }> = [];

async function getEnv(): Promise<Env> {
  try {
    const mod = await import('cloudflare:workers');
    return (mod.env ?? {}) as Env;
  } catch {
    return {};
  }
}

function clientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'local'
  );
}

async function rateLimited(env: Env, ip: string): Promise<boolean> {
  const key = `letter-rate:${ip}`;
  if (env.KV) {
    const current = Number((await env.KV.get(key)) ?? '0');
    if (current >= 8) return true;
    await env.KV.put(key, String(current + 1), { expirationTtl: 60 * 60 });
    return false;
  }
  const hourAgo = Date.now() - 60 * 60 * 1000;
  const recent = memoryLetters.filter((l) => l.ip === ip && Date.parse(l.createdAt) > hourAgo);
  return recent.length >= 8;
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);
}

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ error: 'POST のみ受け付けます' }), {
    status: 405,
    headers: {
      Allow: 'POST',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: '不正なリクエストです' }, { status: 400 });
  }

  const parsed = v.safeParse(letterBodySchema, raw);
  if (!parsed.success) {
    return Response.json({ error: 'スタンプを選んでください' }, { status: 400 });
  }
  const { postId, stamp } = parsed.output;

  const env = await getEnv();
  const ip = clientIp(request);

  if (await rateLimited(env, ip)) {
    return Response.json({ error: '少し時間をおいてください' }, { status: 429 });
  }

  const createdAt = new Date().toISOString();

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO letters (post_id, stamp, created_at, ip_hash) VALUES (?, ?, ?, ?)`,
      )
        .bind(postId, stamp, createdAt, await hashIp(ip))
        .run();
    } catch {
      try {
        await env.DB.prepare(
          `CREATE TABLE IF NOT EXISTS letters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id TEXT NOT NULL,
            stamp TEXT NOT NULL,
            created_at TEXT NOT NULL,
            ip_hash TEXT
          )`,
        ).run();
        await env.DB.prepare(
          `INSERT INTO letters (post_id, stamp, created_at, ip_hash) VALUES (?, ?, ?, ?)`,
        )
          .bind(postId, stamp, createdAt, await hashIp(ip))
          .run();
      } catch {
        return Response.json({ error: '保存に失敗しました' }, { status: 500 });
      }
    }
  } else {
    memoryLetters.push({ postId, stamp, createdAt, ip });
  }

  return Response.json({ ok: true });
};
