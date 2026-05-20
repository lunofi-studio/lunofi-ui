import * as React from 'react';
import { CheckIcon, CodeIcon, TerminalIcon } from 'lucide-react';

import { Button } from '@lunofi/ui/button';

import { useCopy } from '@/lib/clipboard';
import { fetchRegistryItem, installCommand, type RegistryIndexItem } from '@/lib/registry';
import { getDemo } from '@/showcase/demos';

interface ComponentCardProps {
  item: RegistryIndexItem;
}

function ComponentCard({ item }: ComponentCardProps) {
  const demo = getDemo(item.name);
  const install = useCopy();
  const source = useCopy();
  const [sourceError, setSourceError] = React.useState<string | null>(null);
  const [loadingSource, setLoadingSource] = React.useState(false);

  async function copySource() {
    setSourceError(null);
    setLoadingSource(true);
    try {
      const data = await fetchRegistryItem(item.name);
      const content = data.files[0]?.content;
      if (!content) throw new Error('No source available');
      const ok = await source.copy(content);
      if (!ok) throw new Error('Clipboard unavailable');
    } catch (error) {
      setSourceError(error instanceof Error ? error.message : 'Failed to copy source');
    } finally {
      setLoadingSource(false);
    }
  }

  return (
    <article className="bg-card group flex flex-col overflow-hidden rounded-xl border">
      <div className="flex min-h-[8.5rem] flex-1 items-center justify-center border-b p-7">
        {demo?.()}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-medium tracking-tight">{item.title}</h3>
            {item.description && (
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm text-pretty">
                {item.description}
              </p>
            )}
          </div>
          <code className="text-muted-foreground bg-muted shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.6875rem]">
            {item.name}
          </code>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void install.copy(installCommand(item.name))}
          >
            {install.copied ? <CheckIcon aria-hidden /> : <TerminalIcon aria-hidden />}
            {install.copied ? 'Copied' : 'Copy install'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void copySource()}
            disabled={loadingSource}
          >
            {source.copied ? <CheckIcon aria-hidden /> : <CodeIcon aria-hidden />}
            {source.copied ? 'Copied' : loadingSource ? 'Loading…' : 'Copy source'}
          </Button>
        </div>

        {sourceError && <p className="text-destructive text-xs">{sourceError}</p>}
      </div>
    </article>
  );
}

export { ComponentCard };
