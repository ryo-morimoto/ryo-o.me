import { spawn } from "node:child_process";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const astro = path.join(root, "node_modules", ".bin", "astro");

const rewrite = (text) =>
  text
    .replaceAll("astro dev stop", "pnpm dev:stop")
    .replaceAll("astro dev status", "pnpm dev:status")
    .replaceAll("astro dev logs", "pnpm dev:logs");

const child = spawn(astro, ["dev", "--background"], {
  stdio: ["inherit", "pipe", "pipe"],
});

child.stdout.on("data", (chunk) =>
  process.stdout.write(rewrite(chunk.toString()))
);
child.stderr.on("data", (chunk) =>
  process.stderr.write(rewrite(chunk.toString()))
);
child.on("exit", (code) => process.exit(code ?? 0));
