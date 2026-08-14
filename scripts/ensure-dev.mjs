import { execFileSync, spawnSync } from 'node:child_process';

let output = '';
try {
  output = execFileSync('pnpm', ['dev:status'], { encoding: 'utf8' });
} catch (error) {
  output = `${error.stdout ?? ''}${error.stderr ?? ''}${error.message ?? ''}`;
}

process.stdout.write(output);

if (/Dev server running/.test(output)) {
  process.exit(0);
}

const started = spawnSync('pnpm', ['dev:background'], { stdio: 'inherit' });
process.exit(started.status ?? 1);
