import * as React from 'react';

const INSTALL_PREFIX = 'npx lunofi add';

/** Human labels for registry categories, used in the sidebar and filters. */
const categoryLabels: Record<string, string> = {
  actions: 'Actions',
  forms: 'Forms',
  overlay: 'Overlay',
  navigation: 'Navigation',
  'data-display': 'Data display',
  feedback: 'Feedback',
  disclosure: 'Disclosure',
  layout: 'Layout',
};

/** The order categories appear in the docs sidebar. */
const categoryOrder = [
  'actions',
  'forms',
  'overlay',
  'navigation',
  'data-display',
  'disclosure',
  'feedback',
  'layout',
] as const;

interface RegistryIndexItem {
  name: string;
  type: string;
  title: string;
  description: string;
  categories: string[];
}

interface RegistryIndex {
  name: string;
  homepage: string;
  items: RegistryIndexItem[];
}

interface RegistryFile {
  path: string;
  type: string;
  content: string;
}

interface RegistryItem {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

/** The intended install command for a registry item (the CLI is the model). */
function installCommand(name: string): string {
  return `${INSTALL_PREFIX} ${name}`;
}

/** Resolve a registry JSON path relative to the deployed base. */
function registryUrl(path: string): string {
  // import.meta.env.BASE_URL is a Vite-injected build constant, not a runtime
  // env var — the turbo env-var rule is a false positive here.
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  return `${import.meta.env.BASE_URL}r/${path}`;
}

async function fetchRegistryIndex(signal?: AbortSignal): Promise<RegistryIndex> {
  const res = await fetch(registryUrl('index.json'), signal ? { signal } : undefined);
  if (!res.ok) {
    throw new Error(`Failed to load registry index (${res.status})`);
  }
  return (await res.json()) as RegistryIndex;
}

async function fetchRegistryItem(name: string, signal?: AbortSignal): Promise<RegistryItem> {
  const res = await fetch(registryUrl(`${name}.json`), signal ? { signal } : undefined);
  if (!res.ok) {
    throw new Error(`Failed to load "${name}" (${res.status})`);
  }
  return (await res.json()) as RegistryItem;
}

type IndexState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; index: RegistryIndex };

/** Load the registry index once, with abortable lifecycle handling. */
function useRegistryIndex(): IndexState {
  const [state, setState] = React.useState<IndexState>({ status: 'loading' });

  React.useEffect(() => {
    const controller = new AbortController();
    fetchRegistryIndex(controller.signal)
      .then((index) => setState({ status: 'ready', index }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });
    return () => controller.abort();
  }, []);

  return state;
}

/** Only installable component items belong in the docs nav (skip lib + theme). */
function isComponent(item: RegistryIndexItem): boolean {
  return item.type === 'registry:ui';
}

interface CategoryGroup {
  category: string;
  label: string;
  items: RegistryIndexItem[];
}

/**
 * Group component items by their primary (first) category, in the configured
 * sidebar order, with items sorted alphabetically within each group. Any
 * categories not in `categoryOrder` are appended after, also sorted.
 */
function groupByCategory(items: RegistryIndexItem[]): CategoryGroup[] {
  const components = items.filter(isComponent);
  const byCategory = new Map<string, RegistryIndexItem[]>();

  for (const item of components) {
    const category = item.categories[0] ?? 'other';
    const bucket = byCategory.get(category);
    if (bucket) bucket.push(item);
    else byCategory.set(category, [item]);
  }

  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const category of categoryOrder) {
    if (byCategory.has(category)) {
      ordered.push(category);
      seen.add(category);
    }
  }
  for (const category of [...byCategory.keys()].sort()) {
    if (!seen.has(category)) ordered.push(category);
  }

  return ordered.map((category) => ({
    category,
    label: categoryLabels[category] ?? category,
    items: (byCategory.get(category) ?? []).sort((a, b) => a.title.localeCompare(b.title)),
  }));
}

type ItemState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; item: RegistryItem };

type ResolvedItem =
  | { status: 'ready'; name: string; item: RegistryItem }
  | { status: 'error'; name: string; error: string };

/**
 * Load a single registry item by name, re-fetching when the name changes.
 *
 * The resolved value is keyed by `name`; when the requested name differs from
 * the resolved one we report `loading` at render time instead of resetting
 * state synchronously inside the effect.
 */
function useRegistryItem(name: string): ItemState {
  const [resolved, setResolved] = React.useState<ResolvedItem | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    fetchRegistryItem(name, controller.signal)
      .then((item) => setResolved({ status: 'ready', name, item }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResolved({
          status: 'error',
          name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      });
    return () => controller.abort();
  }, [name]);

  if (resolved && resolved.name === name) {
    return resolved.status === 'ready'
      ? { status: 'ready', item: resolved.item }
      : { status: 'error', error: resolved.error };
  }
  return { status: 'loading' };
}

export {
  INSTALL_PREFIX,
  categoryLabels,
  categoryOrder,
  installCommand,
  registryUrl,
  fetchRegistryIndex,
  fetchRegistryItem,
  isComponent,
  groupByCategory,
  useRegistryIndex,
  useRegistryItem,
};
export type { RegistryIndex, RegistryIndexItem, RegistryItem, RegistryFile, CategoryGroup };
