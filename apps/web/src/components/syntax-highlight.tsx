import * as React from 'react';

import { cn } from '@lunofi/ui/lib/utils';

import { useHighlighted, type HighlightLang } from '@/lib/highlighter';

interface SyntaxHighlightProps {
  code: string;
  lang: HighlightLang;
  className?: string;
}

/**
 * Renders Shiki-highlighted source. The highlighter loads asynchronously; until
 * it resolves (or if it errors) we show the raw text in a matching `<pre>` so
 * the code is never blank and stays readable without JS-driven color.
 *
 * Color is supplied by Shiki's inline styles + `--shiki-dark` variables, which
 * the stylesheet swaps under `.dark`. We only own layout (overflow, padding via
 * the consumer, font sizing).
 */
function SyntaxHighlight({ code, lang, className }: SyntaxHighlightProps) {
  const state = useHighlighted(code, lang);

  if (state.status === 'ready') {
    // The HTML is produced solely by Shiki tokenizing our own trusted source
    // strings (registry files + hardcoded snippets), never user input, so
    // rendering it directly carries no XSS surface.
    const markup = { __html: state.html };
    return (
      <div
        className={cn('shiki-block font-mono text-[0.8125rem] leading-relaxed', className)}
        dangerouslySetInnerHTML={markup}
      />
    );
  }

  return (
    <pre
      className={cn(
        'shiki-fallback text-foreground/90 overflow-x-auto font-mono text-[0.8125rem] leading-relaxed',
        className,
      )}
    >
      <code>{code}</code>
    </pre>
  );
}

export { SyntaxHighlight };
