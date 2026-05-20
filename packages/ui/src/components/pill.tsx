'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lunofi/ui/lib/utils';

const pillVariants = cva(
  'inline-flex items-center gap-2 rounded-full font-medium transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
        warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
        error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
        outline:
          'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pulse: false,
    },
  },
);

interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pillVariants> {
  dot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
}

const Pill = React.forwardRef<HTMLDivElement, PillProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      pulse = false,
      dot = false,
      dotColor = 'currentColor',
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="pill"
      data-variant={variant}
      data-size={size}
      className={cn(pillVariants({ variant, size, pulse, className }), removable && 'pr-1')}
      {...props}
    >
      {dot && (
        <div
          className="size-2 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cn(
            'ml-1 inline-flex items-center justify-center rounded-full p-0.5 transition-opacity hover:opacity-70',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
          )}
          aria-label="Remove"
        >
          <XIcon className={cn(size === 'sm' ? 'size-3' : size === 'lg' ? 'size-4' : 'size-3.5')} />
        </button>
      )}
    </div>
  ),
);
Pill.displayName = 'Pill';

export { Pill, pillVariants, type PillProps };
