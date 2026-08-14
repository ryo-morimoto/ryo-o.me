import { execFileSync, spawnSync } from "node:child_process";

function statusOutput() {
  try {
    return execFileSync("pnpm", ["dev:status"], { encoding: "utf8" });
  } catch (error) {
    return `${error.stdout ?? ""}${error.stderr ?? ""}${error.message ?? ""}`;
  }
}

function statusSaysRunning(output) {
  return /Dev server running/.test(output);
}

async function portResponds() {
  try {
    await fetch("http://127.0.0.1:4321/", { signal: AbortSignal.timeout(800) });
    return true;
  } catch {
    return false;
  }
}

const output = statusOutput();
process.stdout.write(output);

if (statusSaysRunning(output) || (await portResponds())) {
  process.exit(0);
}

const started = spawnSync("pnpm", ["dev:background"], { stdio: "inherit" });
process.exit(started.status ?? 1);
