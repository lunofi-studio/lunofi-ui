import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import type { LunofiConfig, RegistryFile } from './types.js';

/**
 * Map a registry file's target-relative path to an absolute path on disk.
 *
 * Registry paths always start with `ui/` (e.g. `ui/button.tsx`,
 * `ui/lib/utils.ts`, `ui/theme.css`). The leading `ui/` segment maps to the
 * project's configured `uiDir`; everything after it is preserved verbatim so
 * the flat, co-located layout (and the relative imports the components use)
 * resolves without any rewriting.
 */
export function resolveTargetPath(file: RegistryFile, config: LunofiConfig, cwd: string): string {
  const normalized = file.path.replace(/\\/g, '/');
  const withoutPrefix = normalized.startsWith('ui/') ? normalized.slice('ui/'.length) : normalized;
  return join(cwd, config.uiDir, withoutPrefix);
}

export interface WriteResult {
  /** Absolute path written (or that already existed). */
  path: string;
  /** Path relative to cwd, for display. */
  displayPath: string;
  /** Whether the file was actually written (false = skipped because it existed). */
  written: boolean;
}

export async function writeRegistryFile(
  file: RegistryFile,
  config: LunofiConfig,
  cwd: string,
  overwrite: boolean,
): Promise<WriteResult> {
  const target = resolveTargetPath(file, config, cwd);
  const displayPath = relative(cwd, target).replace(/\\/g, '/');

  if (existsSync(target) && !overwrite) {
    return { path: target, displayPath, written: false };
  }

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, file.content, 'utf8');
  return { path: target, displayPath, written: true };
}
