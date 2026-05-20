import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

import type { PackageManager } from './types.js';
import { log, color } from './log.js';

/** Detect the package manager from lockfiles in the project root. */
export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun';
  return 'npm';
}

/** Build the install argv for a given package manager. */
function installArgs(pm: PackageManager, packages: string[]): string[] {
  if (pm === 'npm') return ['install', ...packages];
  // pnpm / yarn / bun all use `add`.
  return ['add', ...packages];
}

/**
 * Install npm packages with the detected package manager.
 *
 * Streams the child's output through so the user sees real install progress.
 * On Windows the package-manager binaries are `.cmd` shims, so `shell: true`
 * is required for `spawn` to locate them.
 */
export function installDependencies(
  pm: PackageManager,
  packages: string[],
  cwd: string,
): Promise<void> {
  return new Promise((resolveInstall, reject) => {
    const args = installArgs(pm, packages);
    log.step(`Installing dependencies with ${color.bold(pm)}: ${packages.join(', ')}`);

    const child = spawn(pm, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to run \`${pm} ${args.join(' ')}\`: ${err.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolveInstall();
      } else {
        reject(new Error(`\`${pm} ${args.join(' ')}\` exited with code ${code ?? 'null'}.`));
      }
    });
  });
}
