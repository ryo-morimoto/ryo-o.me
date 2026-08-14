/// <reference types="astro/client" />

type Env = {
  DB?: D1Database;
  KV?: KVNamespace;
  SESSION?: KVNamespace;
  ASSETS?: Fetcher;
};

declare namespace Cloudflare {
  interface Env extends Env {}
}
