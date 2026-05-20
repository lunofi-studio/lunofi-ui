import { Link, useParams } from 'react-router-dom';

import { Badge } from '@lunofi/ui/badge';
import { Skeleton } from '@lunofi/ui/skeleton';

import { ComponentPreview } from '@/components/component-preview';
import { CopyButton } from '@/components/copy-button';
import { InstallCommand } from '@/components/install-command';
import { SyntaxHighlight } from '@/components/syntax-highlight';
import { useDocsContext } from '@/pages/docs-layout';
import { categoryLabels, useRegistryItem } from '@/lib/registry';
import { getDemo } from '@/showcase/demos';

/**
 * A single component page: heading + description from the registry index, a
 * live preview, the install command, and the syntax-highlighted source pulled
 * from the per-item registry JSON.
 */
function ComponentDetailPage() {
  const { name = '' } = useParams();
  const { items } = useDocsContext();
  const indexItem = items.find((item) => item.name === name);
  const demo = getDemo(name);

  if (!indexItem) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-10">
        <p className="text-foreground font-medium">Component not found</p>
        <p className="text-muted-foreground mt-1 text-sm">
          No registry item named <code className="font-mono">{name}</code>.
        </p>
        <Link
          to="/docs/components"
          className="text-primary mt-4 inline-block text-sm underline underline-offset-4"
        >
          Back to overview
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full max-w-4xl px-6 py-10 sm:px-8 lg:px-12">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          {indexItem.categories.map((category) => (
            <Badge key={category} variant="outline">
              {categoryLabels[category] ?? category}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
          {indexItem.title}
        </h1>
        {indexItem.description && (
          <p className="text-muted-foreground mt-2 leading-relaxed text-pretty">
            {indexItem.description}
          </p>
        )}
      </header>

      <div className="mt-8">{demo && <ComponentPreview>{demo()}</ComponentPreview>}</div>

      <section className="mt-8">
        <h2 className="text-sm font-medium tracking-tight">Installation</h2>
        <div className="mt-3 max-w-md">
          <InstallCommand name={indexItem.name} />
        </div>
      </section>

      <SourceSection name={indexItem.name} />
    </article>
  );
}

function SourceSection({ name }: { name: string }) {
  const state = useRegistryItem(name);

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium tracking-tight">Source</h2>
        {state.status === 'ready' && state.item.files[0]?.content && (
          <CopyButton value={state.item.files[0].content} label="Copy source" />
        )}
      </div>

      <div className="bg-card mt-3 overflow-hidden rounded-xl border">
        {state.status === 'loading' && (
          <div className="space-y-2 p-5">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3.5 w-5/6" />
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>
        )}

        {state.status === 'error' && (
          <p className="text-muted-foreground p-5 text-sm">
            Couldn&apos;t load the source ({state.error}).
          </p>
        )}

        {state.status === 'ready' && (
          <>
            {state.item.files[0]?.path && (
              <div className="text-muted-foreground border-b px-4 py-2 font-mono text-xs">
                {state.item.files[0].path}
              </div>
            )}
            <SyntaxHighlight
              code={state.item.files[0]?.content ?? ''}
              lang="tsx"
              className="max-h-[34rem] overflow-auto [&_pre]:p-5"
            />
          </>
        )}
      </div>
    </section>
  );
}

export { ComponentDetailPage };
