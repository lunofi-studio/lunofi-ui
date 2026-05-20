import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { RegistryIndex, RegistryItem } from './types.js';

/**
 * A registry may be addressed three ways:
 *   - an http(s) base URL          → fetched over the network
 *   - a `file://` URL              → read from disk
 *   - a local filesystem path      → read from disk
 *
 * In every case the document for `<name>` lives at `<registry>/<name>.json`
 * and the index at `<registry>/index.json`.
 */
type ResolvedRegistry = { kind: 'http'; base: string } | { kind: 'fs'; base: string };

function classifyRegistry(registry: string, cwd: string): ResolvedRegistry {
  let parsed: URL | undefined;
  try {
    parsed = new URL(registry);
  } catch {
    parsed = undefined;
  }

  if (parsed && (parsed.protocol === 'http:' || parsed.protocol === 'https:')) {
    return { kind: 'http', base: registry.replace(/\/+$/, '') };
  }

  if (parsed && parsed.protocol === 'file:') {
    return { kind: 'fs', base: fileURLToPath(parsed) };
  }

  // Bare filesystem path (relative paths resolve against the project cwd).
  const base = isAbsolute(registry) ? registry : resolve(cwd, registry);
  return { kind: 'fs', base };
}

function joinHttp(base: string, file: string): string {
  return `${base}/${file}`;
}

async function readJson<T>(source: ResolvedRegistry, file: string): Promise<T> {
  if (source.kind === 'http') {
    const url = joinHttp(source.base, file);
    let res: Response;
    try {
      res = await fetch(url);
    } catch (cause) {
      throw new Error(`Failed to reach registry at ${url}: ${(cause as Error).message}`);
    }
    if (!res.ok) {
      throw new Error(`Registry request failed (${res.status} ${res.statusText}): ${url}`);
    }
    return (await res.json()) as T;
  }

  const path = join(source.base, file);
  if (!existsSync(path)) {
    throw new Error(`Registry file not found: ${path}`);
  }
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw) as T;
}

/** Resolves registry access for a configured `registry` value. */
export function createRegistry(registry: string, cwd: string) {
  const source = classifyRegistry(registry, cwd);
  return {
    /** The human-readable location of this registry (URL or absolute path). */
    location: source.base,
    /** Fetch a single item document. */
    getItem(name: string): Promise<RegistryItem> {
      return readJson<RegistryItem>(source, `${name}.json`);
    },
    /** Fetch the registry index. */
    getIndex(): Promise<RegistryIndex> {
      return readJson<RegistryIndex>(source, 'index.json');
    },
  };
}

export type Registry = ReturnType<typeof createRegistry>;
