import { cn } from '@lunofi/ui/lib/utils';

import { CopyButton } from '@/components/copy-button';

interface CodeBlockProps {
  code: string;
  /** Optional leading glyph rendered before the command (e.g. a shell prompt). */
  prompt?: string;
  className?: string;
  /** Larger, hero-weight presentation for the landing install command. */
  emphasis?: boolean;
  copyLabel?: string;
}

function CodeBlock({
  code,
  prompt = '$',
  className,
  emphasis = false,
  copyLabel = 'Copy',
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        'group bg-card flex items-center gap-3 rounded-lg border',
        emphasis ? 'px-4 py-3' : 'px-3 py-2',
        className,
      )}
    >
      <pre
        className={cn(
          'text-foreground/90 min-w-0 flex-1 overflow-x-auto font-mono',
          emphasis ? 'text-sm sm:text-[0.9375rem]' : 'text-[0.8125rem]',
        )}
      >
        <code>
          {prompt && <span className="text-muted-foreground select-none">{prompt} </span>}
          {code}
        </code>
      </pre>
      <CopyButton value={code} label={copyLabel} iconOnly aria-label={`Copy: ${code}`} />
    </div>
  );
}

export { CodeBlock };
