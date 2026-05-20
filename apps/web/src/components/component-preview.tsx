import type * as React from 'react';

import { cn } from '@lunofi/ui/lib/utils';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The framed live-preview surface used on component detail pages: a calm dotted
 * field with the demo centered inside. Mirrors the blocks preview treatment so
 * the two pages feel of a piece.
 */
function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        'bg-card bg-dotted flex min-h-64 items-center justify-center rounded-xl border p-8 sm:p-12',
        className,
      )}
    >
      <div className="flex w-full items-center justify-center">{children}</div>
    </div>
  );
}

export { ComponentPreview };
