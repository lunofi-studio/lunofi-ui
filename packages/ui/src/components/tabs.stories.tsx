import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsList, TabsTab, TabsPanel } from './tabs';

const meta = {
  title: 'Forms/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
      </TabsList>
      <TabsPanel value="account" className="text-muted-foreground text-sm">
        Make changes to your account here.
      </TabsPanel>
      <TabsPanel value="password" className="text-muted-foreground text-sm">
        Change your password here.
      </TabsPanel>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList variant="line">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="analytics">Analytics</TabsTab>
        <TabsTab value="reports">Reports</TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="text-muted-foreground text-sm">
        Overview content.
      </TabsPanel>
      <TabsPanel value="analytics" className="text-muted-foreground text-sm">
        Analytics content.
      </TabsPanel>
      <TabsPanel value="reports" className="text-muted-foreground text-sm">
        Reports content.
      </TabsPanel>
    </Tabs>
  ),
};
