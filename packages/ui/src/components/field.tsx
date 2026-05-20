import * as React from 'react';
import { Field as FieldPrimitive } from '@base-ui/react/field';

import { cn } from '@lunofi/ui/lib/utils';

function Field({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Root>) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn('group/field grid gap-2', className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50 data-[invalid]:text-destructive',
        className,
      )}
      {...props}
    />
  );
}

function FieldControl({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Control>) {
  return <FieldPrimitive.Control data-slot="field-control" className={className} {...props} />;
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Error>) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn('text-destructive text-sm', className)}
      {...props}
    />
  );
}

function FieldValidity({ ...props }: React.ComponentProps<typeof FieldPrimitive.Validity>) {
  return <FieldPrimitive.Validity {...props} />;
}

export { Field, FieldLabel, FieldControl, FieldDescription, FieldError, FieldValidity };
