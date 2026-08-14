import cloudflare from "@astrojs/cloudflare";
import { unified, rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [mdx()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeHeadingIds],
      remarkPlugins: [remarkGfm],
    }),
    shikiConfig: { theme: "everforest-light" },
    syntaxHighlight: { type: "shiki" },
  },
  site: "https://ryo-o.me",
});
