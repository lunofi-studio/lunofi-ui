import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Form,
  Fieldset,
  FieldsetLegend,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from './form';
import { Button } from './button';
import { Input } from './input';

const meta = {
  title: 'Forms/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form
      className="w-80"
      onFormSubmit={(values) => {
        window.alert(JSON.stringify(values, null, 2));
      }}
    >
      <Fieldset>
        <FieldsetLegend>Account</FieldsetLegend>
        <FormField name="name">
          <FormLabel>Name</FormLabel>
          <FormControl render={<Input placeholder="Ada Lovelace" required />} />
          <FormDescription>Your full name.</FormDescription>
          <FormMessage />
        </FormField>
        <FormField
          name="email"
          validate={(value) =>
            typeof value === 'string' && value.includes('@') ? null : 'Enter a valid email.'
          }
        >
          <FormLabel>Email</FormLabel>
          <FormControl render={<Input type="email" placeholder="you@example.com" required />} />
          <FormMessage />
        </FormField>
      </Fieldset>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
