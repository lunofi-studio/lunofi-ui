import * as React from 'react';

import { Skeleton } from '@lunofi/ui/skeleton';
import { cn } from '@lunofi/ui/lib/utils';

import { useRegistryIndex, type RegistryIndexItem } from '@/lib/registry';
import { ComponentCard } from '@/showcase/component-card';

const ALL = 'all';

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

/** Only show installable component items in the gallery (skip lib + theme). */
function isComponent(item: RegistryIndexItem): boolean {
  return item.type === 'registry:ui';
}

function PageIntro() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
      <p className="text-muted-foreground font-mono text-sm">Showcase</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Components
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed text-pretty">
        Every component rendered live. Copy the install command, or grab the full source straight
        from the registry — the same JSON the CLI reads.
      </p>
    </div>
  );
}

function ComponentsPage() {
  const state = useRegistryIndex();
  const [active, setActive] = React.useState<string>(ALL);

  const components = React.useMemo(
    () => (state.status === 'ready' ? state.index.items.filter(isComponent) : []),
    [state],
  );

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    for (const item of components) {
      for (const category of item.categories) set.add(category);
    }
    return [ALL, ...[...set].sort()];
  }, [components]);

  const visible = React.useMemo(
    () => (active === ALL ? components : components.filter((c) => c.categories.includes(active))),
    [components, active],
  );

  return (
    <section className="pb-8">
      <PageIntro />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {state.status === 'ready' && (
          <div className="border-border/70 sticky top-14 z-30 -mx-5 mt-10 mb-8 flex flex-wrap gap-1.5 border-b bg-background/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={cn(
                  'rounded-full px-3 py-1 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  active === category
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {category === ALL ? 'All' : (categoryLabels[category] ?? category)}
              </button>
            ))}
          </div>
        )}

        {state.status === 'loading' && <LoadingGrid />}

        {state.status === 'error' && (
          <div className="mt-10 rounded-xl border border-dashed p-10 text-center">
            <p className="text-foreground font-medium">Couldn&apos;t load the registry.</p>
            <p className="text-muted-foreground mt-1 text-sm">
              {state.error}. The registry JSON is generated at build time into{' '}
              <code className="font-mono">/r/index.json</code>.
            </p>
          </div>
        )}

        {state.status === 'ready' && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <ComponentCard key={item.name} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LoadingGrid() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card overflow-hidden rounded-xl border">
          <div className="flex min-h-[8.5rem] items-center justify-center border-b p-7">
            <Skeleton className="h-9 w-32" />
          </div>
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-8 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { ComponentsPage };
