import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Announcement,
  AnnouncementArrow,
  AnnouncementTag,
  AnnouncementTitle,
} from './announcement';

const meta = {
  title: 'Components/Announcement',
  component: Announcement,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Announcement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Announcement {...args} href="#story">
      <AnnouncementTag>New</AnnouncementTag>
      <AnnouncementTitle>Base UI v1.5 is here</AnnouncementTitle>
      <AnnouncementArrow />
    </Announcement>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Announcement variant="default" href="#story">
        <AnnouncementTag>News</AnnouncementTag>
        <AnnouncementTitle>Default announcement</AnnouncementTitle>
        <AnnouncementArrow />
      </Announcement>
      <Announcement variant="success" href="#story">
        <AnnouncementTag>Shipped</AnnouncementTag>
        <AnnouncementTitle>Feature released</AnnouncementTitle>
        <AnnouncementArrow />
      </Announcement>
      <Announcement variant="warning" href="#story">
        <AnnouncementTag>Heads up</AnnouncementTag>
        <AnnouncementTitle>Scheduled maintenance</AnnouncementTitle>
        <AnnouncementArrow />
      </Announcement>
    </div>
  ),
};
