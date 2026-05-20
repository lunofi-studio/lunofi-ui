import type { Meta, StoryObj } from '@storybook/react-vite';

import { Section } from './section';
import { Container } from './container';

const meta = {
  title: 'Primitives/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    spacing: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spacing: 'md',
  },
  render: (args) => (
    <Section {...args} className="bg-muted">
      <Container>
        <div className="rounded-md border bg-background p-6 text-sm">
          Section with vertical spacing — adjust the <code>spacing</code> control.
        </div>
      </Container>
    </Section>
  ),
};
