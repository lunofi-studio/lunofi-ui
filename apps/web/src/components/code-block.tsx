import { cn } from '@lunofi/ui/lib/utils';

import { CopyButton } from '@/components/copy-button';
import { SyntaxHighlight } from '@/components/syntax-highlight';

interface CodeBlockProps {
  code: string;
  /** Optional leading glyph rendered before the command (e.g. a shell prompt). */
  prompt?: string;
  className?: string;
  /** Larger, hero-weight presentation for the landing install command. */
  emphasis?: boolean;
  copyLabel?: string;
}

/**
 * A single-line command block: a shell prompt, syntax-highlighted command, and
 * a copy button. Copying always writes the raw command (no prompt glyph) while
 * the displayed text is highlighted as bash.
 */
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
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        {prompt && (
          <span
            className={cn(
              'text-muted-foreground shrink-0 font-mono select-none',
              emphasis ? 'text-sm sm:text-[0.9375rem]' : 'text-[0.8125rem]',
            )}
            aria-hidden
          >
            {prompt}
          </span>
        )}
        <SyntaxHighlight
          code={code}
          lang="bash"
          className={cn(
            '[&_pre]:!whitespace-pre',
            emphasis ? '!text-sm sm:!text-[0.9375rem]' : '!text-[0.8125rem]',
          )}
        />
      </div>
      <CopyButton value={code} label={copyLabel} iconOnly aria-label={`Copy: ${code}`} />
    </div>
  );
}

export { CodeBlock };
