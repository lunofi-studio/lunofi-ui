import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Checkbox } from './checkbox';
import { Label } from './label';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  // Proves the checkbox toggles state: clicking flips aria-checked from true.
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', { name: /accept terms/i });
    await expect(checkbox).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute('aria-checked', 'false');
  },
};

export const Indeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="parent" indeterminate />
      <Label htmlFor="parent">Select all</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled defaultChecked />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  ),
};
