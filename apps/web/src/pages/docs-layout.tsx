import { Outlet, useOutletContext } from 'react-router-dom';

import { Skeleton } from '@lunofi/ui/skeleton';

import { DocsSidebar, DocsSidebarMobile } from '@/components/docs-sidebar';
import { useRegistryIndex, type RegistryIndexItem } from '@/lib/registry';

interface DocsContext {
  items: RegistryIndexItem[];
}

/** Access the loaded registry items from any nested docs route. */
function useDocsContext(): DocsContext {
  return useOutletContext<DocsContext>();
}

/**
 * The docs shell: a persistent left sidebar (a drawer on mobile) plus the
 * nested component routes. The registry index loads once here and flows to
 * children via the outlet context.
 */
function DocsLayout() {
  const state = useRegistryIndex();
  const items = state.status === 'ready' ? state.index.items : [];

  if (state.status === 'error') {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8">
        <p className="text-foreground font-medium">Couldn&apos;t load the registry.</p>
        <p className="text-muted-foreground mt-1 text-sm">
          {state.error}. The registry JSON is generated at build time into{' '}
          <code className="font-mono">/r/index.json</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl">
      <DocsSidebar items={items} />

      <div className="min-w-0 flex-1">
        <div className="border-border/70 flex items-center gap-3 border-b px-5 py-3 lg:hidden">
          <DocsSidebarMobile items={items} />
        </div>

        {state.status === 'loading' ? (
          <LoadingDoc />
        ) : (
          <Outlet context={{ items } satisfies DocsContext} />
        )}
      </div>
    </div>
  );
}

function LoadingDoc() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-10">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-4 h-4 w-full max-w-lg" />
      <Skeleton className="mt-2 h-4 w-2/3" />
      <Skeleton className="mt-10 h-64 w-full rounded-xl" />
    </div>
  );
}

export { DocsLayout, useDocsContext };
export type { DocsContext };
