/// <reference types="astro/client" />

interface Env {
  ASSETS?: Fetcher;
}

declare namespace Cloudflare {
  interface Env extends Env {}
}

declare module "cloudflare:workers" {
  export const env: Env;
}
