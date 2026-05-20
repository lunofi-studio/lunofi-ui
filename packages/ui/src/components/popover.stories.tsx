import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Dimensions</h4>
            <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <Input placeholder="Width" defaultValue="100%" />
            <Input placeholder="Height" defaultValue="25px" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
