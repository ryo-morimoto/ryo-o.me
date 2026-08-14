// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import { unified, rehypeHeadingIds } from "@astrojs/markdown-remark";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  site: "https://ryo-o.me",
  integrations: [mdx()],
  adapter: cloudflare({
    imageService: "compile",
  }),
  markdown: {
    syntaxHighlight: { type: "shiki" },
    shikiConfig: { theme: "everforest-light" },
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHeadingIds],
    }),
  },
});
