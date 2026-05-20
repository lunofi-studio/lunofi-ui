import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

const meta = {
  title: 'Overlays/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerExample({ side }: { side: 'top' | 'right' | 'bottom' | 'left' }) {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open {side}</Button>} />
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>Drawer ({side})</DrawerTitle>
          <DrawerDescription>A sliding panel anchored to the {side} edge.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export const Default: Story = {
  render: () => <DrawerExample side="right" />,
};

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <DrawerExample side="top" />
      <DrawerExample side="right" />
      <DrawerExample side="bottom" />
      <DrawerExample side="left" />
    </div>
  ),
};
