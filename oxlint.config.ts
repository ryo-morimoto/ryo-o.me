import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core, astro],
  ignorePatterns: [...(core.ignorePatterns ?? []), "src/content/**"],
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
