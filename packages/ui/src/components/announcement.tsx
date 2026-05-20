'use client';

import * as React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lunofi/ui/lib/utils';

const announcementVariants = cva(
  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:shadow-md hover:scale-105 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800',
        success:
          'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-green-900 dark:text-green-200 border border-green-200 dark:border-green-800',
        warning:
          'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800',
        error:
          'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface AnnouncementProps
  extends React.ComponentProps<'a'>, VariantProps<typeof announcementVariants> {}

const Announcement = React.forwardRef<HTMLAnchorElement, AnnouncementProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <a
      ref={ref}
      data-slot="announcement"
      data-variant={variant}
      className={cn(announcementVariants({ variant, className }), 'group/announcement')}
      {...props}
    >
      {children}
    </a>
  ),
);
Announcement.displayName = 'Announcement';

const AnnouncementTag = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="announcement-tag"
      className={cn(
        'rounded-full px-2 py-0.5 text-xs font-semibold bg-white/50 dark:bg-black/20 ring-1 ring-current/10',
        className,
      )}
      {...props}
    />
  ),
);
AnnouncementTag.displayName = 'AnnouncementTag';

const AnnouncementTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="announcement-title"
      className={cn('font-semibold', className)}
      {...props}
    />
  ),
);
AnnouncementTitle.displayName = 'AnnouncementTitle';

const AnnouncementArrow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="announcement-arrow"
      className={cn(
        'ml-2 transition-transform group-hover/announcement:translate-x-0.5',
        className,
      )}
      {...props}
    >
      <ArrowRightIcon className="size-4" />
    </div>
  ),
);
AnnouncementArrow.displayName = 'AnnouncementArrow';

export {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
  AnnouncementArrow,
  announcementVariants,
  type AnnouncementProps,
};
