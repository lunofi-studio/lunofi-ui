import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea } from './scroll-area';

const meta = {
  title: 'Overlays/ScrollArea',
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm">
            <div className="py-1.5">{tag}</div>
            <div className="bg-border h-px" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
