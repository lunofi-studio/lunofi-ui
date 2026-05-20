'use client';

import * as React from 'react';
import { XIcon, AlertCircle, CheckCircle2, AlertTriangle, Info, Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lunofi/ui/lib/utils';
import { Button } from '@lunofi/ui/button';

const bannerVariants = cva(
  'relative w-full flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-200',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200',
        success:
          'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 text-green-900 dark:text-green-200',
        warning:
          'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200',
        error:
          'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200',
        neutral:
          'bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200',
      },
      size: {
        default: 'px-4 py-3',
        compact: 'px-3 py-2 text-xs',
      },
      sticky: {
        true: 'sticky top-0 z-40 shadow-md',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'default',
      sticky: false,
    },
  },
);

interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = 'neutral', size = 'default', sticky = false, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="banner"
      data-variant={variant}
      data-size={size}
      className={cn(
        bannerVariants({ variant, size, sticky, className }),
        'animate-in fade-in slide-in-from-top-2 duration-300',
      )}
      role="alert"
      {...props}
    />
  ),
);
Banner.displayName = 'Banner';

const iconVariants: Record<NonNullable<BannerIconProps['variant']>, React.ReactNode> = {
  info: <Info className="size-4 shrink-0 mt-0.5" />,
  success: <CheckCircle2 className="size-4 shrink-0 mt-0.5" />,
  warning: <AlertTriangle className="size-4 shrink-0 mt-0.5" />,
  error: <AlertCircle className="size-4 shrink-0 mt-0.5" />,
  neutral: <Circle className="size-4 shrink-0 mt-0.5" />,
};

interface BannerIconProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

const BannerIcon = React.forwardRef<HTMLDivElement, BannerIconProps>(
  ({ className, variant = 'neutral', ...props }, ref) => (
    <div ref={ref} data-slot="banner-icon" className={cn('flex items-start', className)} {...props}>
      {iconVariants[variant]}
    </div>
  ),
);
BannerIcon.displayName = 'BannerIcon';

const BannerTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="banner-title" className={cn('font-semibold', className)} {...props} />
  ),
);
BannerTitle.displayName = 'BannerTitle';

const BannerDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="banner-description"
      className={cn('opacity-90', className)}
      {...props}
    />
  ),
);
BannerDescription.displayName = 'BannerDescription';

const BannerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="banner-content" className={cn('flex-1', className)} {...props} />
  ),
);
BannerContent.displayName = 'BannerContent';

const BannerAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="banner-action"
      className={cn('flex items-center gap-2 shrink-0', className)}
      {...props}
    />
  ),
);
BannerAction.displayName = 'BannerAction';

interface BannerCloseProps extends React.ComponentProps<typeof Button> {
  onClose?: () => void;
}

const BannerClose = React.forwardRef<HTMLButtonElement, BannerCloseProps>(
  ({ className, onClose, onClick, ...props }, ref) => (
    <Button
      ref={ref}
      data-slot="banner-close"
      variant="ghost"
      size="icon-xs"
      className={cn(
        'opacity-70 hover:opacity-100 transition-opacity h-5 w-5 p-0 shrink-0',
        className,
      )}
      onClick={(e) => {
        onClose?.();
        onClick?.(e);
      }}
      {...props}
    >
      <XIcon className="size-4" />
      <span className="sr-only">Close</span>
    </Button>
  ),
);
BannerClose.displayName = 'BannerClose';

export {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerDescription,
  BannerContent,
  BannerAction,
  BannerClose,
  bannerVariants,
  type BannerProps,
};
