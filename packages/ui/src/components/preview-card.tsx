import * as React from 'react';
import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';

import { cn } from '@lunofi/ui/lib/utils';

function PreviewCard({ ...props }: React.ComponentProps<typeof PreviewCardPrimitive.Root>) {
  return <PreviewCardPrimitive.Root {...props} />;
}

function PreviewCardTrigger({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Trigger>) {
  return <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />;
}

function PreviewCardContent({
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof PreviewCardPrimitive.Positioner>,
    'align' | 'side' | 'sideOffset'
  >) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        data-slot="preview-card-positioner"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="preview-card-content"
          className={cn(
            'bg-popover text-popover-foreground w-64 origin-(--transform-origin) rounded-md border p-4 shadow-md outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
            className,
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { PreviewCard, PreviewCardTrigger, PreviewCardContent };
