import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@lunofi/ui/lib/utils';

import { CodeBlock } from '@/components/code-block';
import { useDocsContext } from '@/pages/docs-layout';
import { groupByCategory, installCommand } from '@/lib/registry';
import { getDemo } from '@/showcase/demos';

const FEATURED = ['button', 'dialog', 'select', 'table'];

/**
 * The page users land on at /docs/components: a short orientation, the install
 * command, a few featured live previews, and links into every category.
 */
function DocsOverviewPage() {
  const { items } = useDocsContext();
  const groups = groupByCategory(items);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const featured = FEATURED.map((name) => items.find((item) => item.name === name)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-10">
      <p className="text-muted-foreground font-mono text-sm">Components</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance">Overview</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
        {total} calm, copy-paste components built on Base UI and Tailwind CSS. Pick one from the
        sidebar to see a live preview, copy the install command, and read the full source — the same
        JSON the CLI reads.
      </p>

      <div className="mt-7 max-w-md">
        <CodeBlock code={installCommand('button')} />
      </div>

      <section className="mt-12">
        <h2 className="text-sm font-medium tracking-tight">Featured</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((item) => {
            const demo = getDemo(item.name);
            return (
              <Link
                key={item.name}
                to={`/docs/components/${item.name}`}
                className="group bg-card hover:border-border focus-visible:ring-ring/50 flex flex-col overflow-hidden rounded-xl border outline-none focus-visible:ring-[3px]"
              >
                <div className="bg-dotted flex min-h-32 flex-1 items-center justify-center p-6">
                  <div className="pointer-events-none origin-center scale-90">{demo?.()}</div>
                </div>
                <div className="flex items-center justify-between gap-2 border-t px-4 py-3">
                  <span className="font-medium tracking-tight">{item.title}</span>
                  <ArrowRightIcon
                    className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium tracking-tight">Browse by category</h2>
        <div className="mt-4 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category} className="bg-card flex flex-col gap-2 p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-medium tracking-tight">{group.label}</h3>
                <span className="text-muted-foreground font-mono text-xs">
                  {group.items.length}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={`/docs/components/${item.name}`}
                      className={cn(
                        'text-muted-foreground hover:bg-muted hover:text-foreground inline-flex rounded-md px-2 py-0.5 text-sm transition-colors',
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { DocsOverviewPage };
