import * as React from 'react';
import { CheckIcon, CodeIcon, CopyIcon, EyeIcon } from 'lucide-react';

import { Button } from '@lunofi/ui/button';
import { cn } from '@lunofi/ui/lib/utils';

import { SyntaxHighlight } from '@/components/syntax-highlight';
import { useCopy } from '@/lib/clipboard';
import { blocks, type BlockDefinition } from '@/blocks/definitions';

function BlocksPage() {
  return (
    <section className="pb-8">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <p className="text-muted-foreground font-mono text-sm">Composed</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Blocks
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed text-pretty">
          Ready-made sections assembled entirely from lunofi-ui components. Preview each one, then
          copy the JSX and adjust to taste.
        </p>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-12 px-5 sm:px-8">
        {blocks.map((block) => (
          <BlockShowcase key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}

function BlockShowcase({ block }: { block: BlockDefinition }) {
  const [view, setView] = React.useState<'preview' | 'code'>('preview');
  const { copied, copy } = useCopy();
  const { Preview } = block;

  return (
    <article className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-medium tracking-tight">{block.title}</h2>
          <p className="text-muted-foreground mt-0.5 text-sm text-pretty">{block.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted flex items-center gap-0.5 rounded-lg p-0.5">
            <ViewTab active={view === 'preview'} onClick={() => setView('preview')} icon={EyeIcon}>
              Preview
            </ViewTab>
            <ViewTab active={view === 'code'} onClick={() => setView('code')} icon={CodeIcon}>
              Code
            </ViewTab>
          </div>
          <Button variant="outline" size="sm" onClick={() => void copy(block.source)}>
            {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
            {copied ? 'Copied' : 'Copy JSX'}
          </Button>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border">
        {view === 'preview' ? (
          <div className="bg-dotted flex items-center justify-center p-6 sm:p-10">
            <div className="w-full">
              <Preview />
            </div>
          </div>
        ) : (
          <SyntaxHighlight
            code={block.source}
            lang="tsx"
            className="max-h-[28rem] overflow-auto [&_pre]:p-5"
          />
        )}
      </div>
    </article>
  );
}

function ViewTab({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {children}
    </button>
  );
}

export { BlocksPage };
