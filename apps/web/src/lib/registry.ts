import * as React from 'react';

const INSTALL_PREFIX = 'npx lunofi add';

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

export {
  INSTALL_PREFIX,
  installCommand,
  registryUrl,
  fetchRegistryIndex,
  fetchRegistryItem,
  useRegistryIndex,
};
export type { RegistryIndex, RegistryIndexItem, RegistryItem, RegistryFile };
