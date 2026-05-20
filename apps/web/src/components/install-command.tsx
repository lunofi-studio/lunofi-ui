import { cn } from '@lunofi/ui/lib/utils';

import { CopyButton } from '@/components/copy-button';
import { SyntaxHighlight } from '@/components/syntax-highlight';
import {
  PACKAGE_MANAGERS,
  addCommand,
  usePackageManager,
  type PackageManager,
} from '@/lib/package-manager';

interface InstallCommandProps {
  /** The registry item name to install (e.g. `button`). */
  name: string;
  className?: string;
  /** Larger, hero-weight presentation for the landing install command. */
  emphasis?: boolean;
}

const PM_LABELS: Record<PackageManager, string> = {
  npm: 'npm',
  pnpm: 'pnpm',
  yarn: 'yarn',
  bun: 'bun',
};

/**
 * A package-manager-aware install block: a segmented row of PM pills (npm /
 * pnpm / yarn / bun) above a single-line command with a shell prompt and copy
 * button. The selected PM is global (shared via context + localStorage), so
 * every instance on the site stays in sync and the choice persists across
 * navigation. Copying writes the raw command for the active PM.
 */
function InstallCommand({ name, className, emphasis = false }: InstallCommandProps) {
  const { pm, setPm } = usePackageManager();
  const command = addCommand(name, pm);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        role="tablist"
        aria-label="Package manager"
        className="bg-card flex w-fit items-center gap-0.5 rounded-lg border p-0.5"
      >
        {PACKAGE_MANAGERS.map((value) => {
          const selected = value === pm;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setPm(value)}
              className={cn(
                'focus-visible:ring-ring/50 rounded-md px-2.5 py-1 font-mono text-xs transition-colors outline-none focus-visible:ring-[3px]',
                selected
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {PM_LABELS[value]}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          'group bg-card flex items-center gap-3 rounded-lg border',
          emphasis ? 'px-4 py-3' : 'px-3 py-2',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          <span
            className={cn(
              'text-muted-foreground shrink-0 font-mono select-none',
              emphasis ? 'text-sm sm:text-[0.9375rem]' : 'text-[0.8125rem]',
            )}
            aria-hidden
          >
            $
          </span>
          <SyntaxHighlight
            code={command}
            lang="bash"
            className={cn(
              '[&_pre]:!whitespace-pre',
              emphasis ? '!text-sm sm:!text-[0.9375rem]' : '!text-[0.8125rem]',
            )}
          />
        </div>
        <CopyButton value={command} label="Copy" iconOnly aria-label={`Copy: ${command}`} />
      </div>
    </div>
  );
}

export { InstallCommand };
