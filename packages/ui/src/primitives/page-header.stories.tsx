import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageHeader } from './page-header';
import { Button } from '../components/button';

const meta = {
  title: 'Primitives/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Dashboard',
    description: 'An overview of your workspace activity.',
  },
};

export const WithActions: Story = {
  args: {
    heading: 'Projects',
    description: 'Manage and organize all of your projects.',
  },
  render: (args) => (
    <PageHeader {...args}>
      <div className="flex gap-2 pt-2">
        <Button>New project</Button>
        <Button variant="outline">Import</Button>
      </div>
    </PageHeader>
  ),
};
