import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoldIcon, ItalicIcon } from 'lucide-react';

import { Toggle } from './toggle';

const meta = {
  title: 'Forms/Toggle',
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
};

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic" defaultPressed>
      <ItalicIcon />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
};
