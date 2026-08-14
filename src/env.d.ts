/// <reference types="astro/client" />

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

type Env = {
  DB?: D1Database;
  KV?: KVNamespace;
  SESSION?: KVNamespace;
};

declare namespace Cloudflare {
  interface Env extends Env {}
}

declare module 'cloudflare:workers' {
  export const env: Env;
}
