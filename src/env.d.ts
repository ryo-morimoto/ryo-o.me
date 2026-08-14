/// <reference types="astro/client" />

type Env = {
  ASSETS?: Fetcher;
};

declare namespace Cloudflare {
  interface Env extends Env {}
}
