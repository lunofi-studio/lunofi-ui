import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pill } from './pill';

const meta = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    pulse: { control: 'boolean' },
    dot: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Pill',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Pill variant="default">Default</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="error">Error</Pill>
      <Pill variant="info">Info</Pill>
      <Pill variant="outline">Outline</Pill>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Pill variant="success" dot>
        Online
      </Pill>
      <Pill variant="warning" dot pulse>
        Connecting
      </Pill>
    </div>
  ),
};

export const Removable: Story = {
  args: {
    children: 'Removable',
    removable: true,
    variant: 'info',
  },
};
