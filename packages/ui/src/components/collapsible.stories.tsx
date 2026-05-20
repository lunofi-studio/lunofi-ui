import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronsUpDown } from 'lucide-react';

import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta = {
  title: 'Overlays/Collapsible',
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80 space-y-2">
      <div className="flex items-center justify-between gap-4 px-1">
        <h4 className="text-sm font-semibold">@lunofi starred 3 repositories</h4>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">@lunofi/ui</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@lunofi/tailwind</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@lunofi/tsconfig</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
