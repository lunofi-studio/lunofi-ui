import { cn } from '@lunofi/ui/lib/utils';

/** The lunofi wordmark: a quiet ringed glyph + lowercase logotype. */
function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden className="text-primary shrink-0">
        <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2.25" />
        <circle cx="22" cy="10" r="3" fill="currentColor" />
      </svg>
      <span className="text-[0.9375rem] font-semibold tracking-tight">
        lunofi<span className="text-muted-foreground font-normal">-ui</span>
      </span>
    </span>
  );
}

export { Logo };
