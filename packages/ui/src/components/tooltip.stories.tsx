import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// `Tooltip` already wraps a `TooltipProvider` internally. Wrap a shared
// `TooltipProvider` at the app root when you want a grouped open/close delay
// across many tooltips.
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <div className="flex gap-4">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};
