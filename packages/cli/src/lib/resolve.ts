import type { Registry } from './registry.js';
import type { RegistryItem } from './types.js';

/**
 * Transitively resolve a set of requested item names into the full, de-duped
 * list of items to install (each item plus every item reachable through its
 * `registryDependencies`).
 *
 * Resolution is depth-first. Cycles are detected via an on-stack marker and
 * surfaced as an error rather than looping forever. Fetched items are memoized
 * so each registry document is requested at most once.
 *
 * The returned list is ordered dependencies-first (a topological order), so
 * callers may write files in an order where every dependency precedes its
 * dependents.
 */
export async function resolveItems(registry: Registry, names: string[]): Promise<RegistryItem[]> {
  const fetched = new Map<string, RegistryItem>();
  const resolved = new Map<string, RegistryItem>();
  const onStack = new Set<string>();

  async function getItem(name: string): Promise<RegistryItem> {
    const cached = fetched.get(name);
    if (cached) return cached;
    const item = await registry.getItem(name);
    fetched.set(name, item);
    return item;
  }

  async function visit(name: string, trail: string[]): Promise<void> {
    if (resolved.has(name)) return;

    if (onStack.has(name)) {
      throw new Error(`Cyclic registry dependency detected: ${[...trail, name].join(' → ')}`);
    }

    onStack.add(name);
    const item = await getItem(name);

    for (const dep of item.registryDependencies) {
      await visit(dep, [...trail, name]);
    }

    onStack.delete(name);
    // Insert after deps so iteration order is dependencies-first.
    resolved.set(name, item);
  }

  for (const name of names) {
    await visit(name, []);
  }

  return [...resolved.values()];
}

/** The sorted, de-duped union of npm dependencies across resolved items. */
export function collectNpmDependencies(items: RegistryItem[]): string[] {
  const deps = new Set<string>();
  for (const item of items) {
    for (const dep of item.dependencies) {
      deps.add(dep);
    }
  }
  return [...deps].sort((a, b) => a.localeCompare(b));
}
