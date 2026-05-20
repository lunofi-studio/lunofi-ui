import * as React from 'react';

import { cn } from '@lunofi/ui/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
}

function PageHeader({ heading, description, className, children, ...props }: PageHeaderProps) {
  return (
    <div data-slot="page-header" className={cn('space-y-2', className)} {...props}>
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {description && <p className="text-muted-foreground text-lg">{description}</p>}
      {children}
    </div>
  );
}

export { PageHeader };
