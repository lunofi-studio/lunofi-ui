import * as React from 'react';

import { cn } from '@lunofi/ui/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Adds vertical padding between sections */
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingMap = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
} as const;

function Section({ className, spacing = 'md', ...props }: SectionProps) {
  return <section data-slot="section" className={cn(spacingMap[spacing], className)} {...props} />;
}

export { Section };
