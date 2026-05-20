import * as React from 'react';

/** The package managers we surface in install blocks, in display order. */
const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const DEFAULT_PM: PackageManager = 'npm';
const STORAGE_KEY = 'lunofi-pm';

/**
 * Build the `add <name>` command for a package manager. Our CLI ships as the
 * bare `lunofi` package and is invoked through each PM's package-runner.
 */
function addCommand(name: string, pm: PackageManager): string {
  switch (pm) {
    case 'pnpm':
      return `pnpm dlx lunofi add ${name}`;
    case 'yarn':
      return `yarn dlx lunofi add ${name}`;
    case 'bun':
      return `bunx lunofi add ${name}`;
    case 'npm':
    default:
      return `npx lunofi add ${name}`;
  }
}

function isPackageManager(value: unknown): value is PackageManager {
  return typeof value === 'string' && (PACKAGE_MANAGERS as readonly string[]).includes(value);
}

function readStoredPm(): PackageManager {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isPackageManager(stored)) return stored;
  } catch {
    // Ignore storage failures (private mode, etc.).
  }
  return DEFAULT_PM;
}

interface PackageManagerContextValue {
  pm: PackageManager;
  setPm: (pm: PackageManager) => void;
}

const PackageManagerContext = React.createContext<PackageManagerContextValue | null>(null);

/**
 * Holds the globally selected package manager. The selection persists to
 * localStorage so navigating between pages keeps the same PM, and listens to
 * the `storage` event so other tabs (and other instances) stay in sync live.
 */
function PackageManagerProvider({ children }: { children: React.ReactNode }) {
  const [pm, setPmState] = React.useState<PackageManager>(readStoredPm);

  const setPm = React.useCallback((next: PackageManager) => {
    setPmState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures (private mode, etc.).
    }
  }, []);

  React.useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      if (isPackageManager(event.newValue)) {
        setPmState(event.newValue);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = React.useMemo<PackageManagerContextValue>(() => ({ pm, setPm }), [pm, setPm]);

  return <PackageManagerContext.Provider value={value}>{children}</PackageManagerContext.Provider>;
}

function usePackageManager(): PackageManagerContextValue {
  const context = React.useContext(PackageManagerContext);
  if (!context) {
    throw new Error('usePackageManager must be used within a PackageManagerProvider');
  }
  return context;
}

export {
  PACKAGE_MANAGERS,
  DEFAULT_PM,
  addCommand,
  isPackageManager,
  PackageManagerProvider,
  usePackageManager,
};
export type { PackageManager };
