import * as React from 'react';
import { Form as FormPrimitive } from '@base-ui/react/form';
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';

import { cn } from '@lunofi/ui/lib/utils';
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldValidity,
} from '@lunofi/ui/field';

function Form({ className, ...props }: React.ComponentProps<typeof FormPrimitive>) {
  return <FormPrimitive data-slot="form" className={cn('grid gap-6', className)} {...props} />;
}

function Fieldset({ className, ...props }: React.ComponentProps<typeof FieldsetPrimitive.Root>) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      className={cn('grid gap-4', className)}
      {...props}
    />
  );
}

function FieldsetLegend({
  className,
  ...props
}: React.ComponentProps<typeof FieldsetPrimitive.Legend>) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      className={cn('text-base leading-none font-medium', className)}
      {...props}
    />
  );
}

export {
  Form,
  Fieldset,
  FieldsetLegend,
  Field as FormField,
  FieldLabel as FormLabel,
  FieldControl as FormControl,
  FieldDescription as FormDescription,
  FieldError as FormMessage,
  FieldValidity as FormValidity,
};
