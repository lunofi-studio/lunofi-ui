/** Registry item kinds emitted by `@lunofi/registry`. */
export type RegistryItemType = 'registry:ui' | 'registry:lib' | 'registry:theme';

/** A single file shipped with a registry item. `path` is target-relative (e.g. `ui/button.tsx`). */
export interface RegistryFile {
  path: string;
  type: string;
  content: string;
}

/** A fully-resolved registry item (`/r/<name>.json`). */
export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

/** A summary entry in the registry index (`/r/index.json`). */
export interface RegistryIndexItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  categories: string[];
}

/** The registry index document. */
export interface RegistryIndex {
  name: string;
  homepage: string;
  items: RegistryIndexItem[];
}

/** The project-level `lunofi.json` config written by `lunofi init`. */
export interface LunofiConfig {
  $schema?: string;
  registry: string;
  uiDir: string;
  aliases: {
    ui: string;
  };
}

/** Detected package manager. */
export type PackageManager = 'pnpm' | 'yarn' | 'bun' | 'npm';
