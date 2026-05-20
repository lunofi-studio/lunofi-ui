import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta = {
  title: 'Overlays/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={['item-1']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the rest of the system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It is animated by default using the panel height var.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  // Proves a collapsed item expands on click: item-2 starts closed, clicking
  // its trigger flips aria-expanded and reveals the panel.
  play: async ({ canvas, userEvent }) => {
    const styledTrigger = canvas.getByRole('button', { name: /is it styled/i });
    await expect(styledTrigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(styledTrigger);
    await expect(styledTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(await canvas.findByText(/comes with default styles/i)).toBeVisible();
  },
};

export const Multiple: Story = {
  render: () => (
    <Accordion multiple defaultValue={['item-1', 'item-2']} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>Multiple items can be open at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>This one stays open independently.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
