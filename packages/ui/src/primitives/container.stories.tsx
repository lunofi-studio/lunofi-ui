import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container } from './container';

const meta = {
  title: 'Primitives/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container className="bg-muted py-8">
      <div className="rounded-md border bg-background p-6 text-sm">
        Centered, max-width container with responsive horizontal padding.
      </div>
    </Container>
  ),
};
