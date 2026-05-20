import type { Meta, StoryObj } from '@storybook/react-vite';

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
