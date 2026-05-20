import { CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from '@lunofi/ui/button';
import { cn } from '@lunofi/ui/lib/utils';

import { useCopy } from '@/lib/clipboard';

interface CopyButtonProps {
  /** The text written to the clipboard. */
  value: string;
  /** Visible label; swapped for a confirmation while copied. */
  label?: string;
  copiedLabel?: string;
  size?: 'xs' | 'sm' | 'default';
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  iconOnly?: boolean;
  'aria-label'?: string;
}

function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  size = 'sm',
  variant = 'outline',
  className,
  iconOnly = false,
  'aria-label': ariaLabel,
}: CopyButtonProps) {
  const { copied, copy } = useCopy();
  const Icon = copied ? CheckIcon : CopyIcon;

  return (
    <Button
      type="button"
      size={iconOnly ? 'icon-sm' : size}
      variant={variant}
      onClick={() => void copy(value)}
      aria-label={ariaLabel ?? (iconOnly ? label : undefined)}
      className={cn('transition-colors', copied && 'text-primary', className)}
    >
      <Icon className={cn(copied && 'text-primary')} aria-hidden />
      {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
    </Button>
  );
}

export { CopyButton };
