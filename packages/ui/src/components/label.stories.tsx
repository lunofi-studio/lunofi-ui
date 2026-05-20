import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './label';
import { Input } from './input';

const meta = {
  title: 'Forms/Label',
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};
