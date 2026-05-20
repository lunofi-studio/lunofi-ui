import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from './field';
import { Input } from './input';

const meta = {
  title: 'Forms/Field',
  component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field name="username" className="w-72">
      <FieldLabel>Username</FieldLabel>
      <FieldControl render={<Input placeholder="lunofi" />} />
      <FieldDescription>This is your public display name.</FieldDescription>
    </Field>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <Field
      name="email"
      className="w-72"
      validate={(value) =>
        typeof value === 'string' && value.includes('@') ? null : 'Enter a valid email.'
      }
      validationMode="onChange"
    >
      <FieldLabel>Email</FieldLabel>
      <FieldControl render={<Input type="email" placeholder="you@example.com" />} />
      <FieldError />
    </Field>
  ),
};
