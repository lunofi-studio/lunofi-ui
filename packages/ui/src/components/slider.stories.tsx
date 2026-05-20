import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider, SliderValue } from './slider';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={50} max={100} step={1} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <Slider defaultValue={40} max={100} step={1} className="w-80">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Volume</span>
        <SliderValue />
      </div>
    </Slider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Slider defaultValue={30} max={100} step={1} disabled />
    </div>
  ),
};
