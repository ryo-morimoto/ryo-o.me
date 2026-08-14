import { execFileSync, spawnSync } from "node:child_process";

const statusOutput = () => {
  try {
    return execFileSync("pnpm", ["dev:status"], { encoding: "utf-8" });
  } catch (error) {
    return `${error.stdout ?? ""}${error.stderr ?? ""}${error.message ?? ""}`;
  }
};

const statusSaysRunning = (output) => /Dev server running/u.test(output);

const portResponds = async () => {
  try {
    await fetch("http://127.0.0.1:4321/", { signal: AbortSignal.timeout(800) });
    return true;
  } catch {
    return false;
  }
};

const output = statusOutput();
process.stdout.write(output);

if (statusSaysRunning(output) || (await portResponds())) {
  process.exit(0);
}

const started = spawnSync("pnpm", ["dev:background"], { stdio: "inherit" });
process.exit(started.status ?? 1);
