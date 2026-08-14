import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";

export default defineConfig({
  // anti-slop is on from the start: type assertions and value widening fail
  // the lint rather than wait for a later bug. Do not add empty SAFETY comments.
  extends: [core, astro, antiSlop],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    "src/content/**",
    // Vendored Cursor skills/agents (Impeccable, dmmulroy). Not app code.
    ".cursor/**",
  ],
  options: {
    typeAware: true,
  },
  overrides: [
    {
      files: ["**/*.astro"],
      rules: {
        // Astro components stay PascalCase; kebab-case would break import convention.
        "unicorn/filename-case": "off",
      },
    },
    {
      files: ["src/env.d.ts"],
      rules: {
        "typescript/no-empty-interface": "off",
        "typescript/no-empty-object-type": "off",
      },
    },
    {
      files: ["scripts/**/*.mjs"],
      rules: {
        "typescript/no-unsafe-argument": "off",
        "typescript/no-unsafe-call": "off",
        "typescript/no-unsafe-member-access": "off",
        "typescript/no-unsafe-return": "off",
        "typescript/strict-void-return": "off",
      },
    },
    {
      files: ["tests/**/*.ts"],
      rules: {
        "typescript/no-floating-promises": "off",
      },
    },
  ],
});
