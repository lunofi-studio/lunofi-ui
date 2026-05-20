import * as React from 'react';

import { cn } from '@lunofi/ui/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'main';
}

function Container({ className, as: Comp = 'div', ...props }: ContainerProps) {
  return (
    <Comp
      data-slot="container"
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}

export { Container };
