import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Switch } from './switch';
import { Label } from './label';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
  // Proves the switch toggles: starts unchecked, clicking flips aria-checked.
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('switch', { name: /airplane mode/i });
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
  },
};

export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="small" size="sm" defaultChecked />
      <Label htmlFor="small">Compact switch</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="disabled" disabled defaultChecked />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  ),
};
