import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Banner,
  BannerAction,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from './banner';
import { Button } from './button';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Banner {...args} className="w-[28rem]">
      <BannerIcon variant={args.variant ?? 'neutral'} />
      <BannerContent>
        <BannerTitle>Heads up</BannerTitle>
        <BannerDescription>This is an informational banner.</BannerDescription>
      </BannerContent>
    </Banner>
  ),
  args: {
    variant: 'info',
  },
};

export const WithActions: Story = {
  render: () => (
    <Banner variant="warning" className="w-[28rem]">
      <BannerIcon variant="warning" />
      <BannerContent>
        <BannerTitle>Your trial ends soon</BannerTitle>
        <BannerDescription>Upgrade to keep your data.</BannerDescription>
      </BannerContent>
      <BannerAction>
        <Button size="sm" variant="outline">
          Upgrade
        </Button>
      </BannerAction>
      <BannerClose />
    </Banner>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-[28rem] flex-col gap-3">
      {(['info', 'success', 'warning', 'error', 'neutral'] as const).map((variant) => (
        <Banner key={variant} variant={variant}>
          <BannerIcon variant={variant} />
          <BannerContent>
            <BannerTitle className="capitalize">{variant}</BannerTitle>
            <BannerDescription>A {variant} banner message.</BannerDescription>
          </BannerContent>
        </Banner>
      ))}
    </div>
  ),
};
