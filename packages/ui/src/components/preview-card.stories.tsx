import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDays } from 'lucide-react';

import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from './preview-card';

const meta = {
  title: 'Overlays/PreviewCard',
  component: PreviewCard,
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCardTrigger
        render={
          <a href="#lunofi" className="text-sm font-medium underline underline-offset-4">
            @lunofi
          </a>
        }
      />
      <PreviewCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <div className="bg-muted size-12 rounded-full" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@lunofi</h4>
            <p className="text-sm">A calm, customizable design system built on Base UI.</p>
            <div className="text-muted-foreground flex items-center gap-2 pt-1 text-xs">
              <CalendarDays className="size-3.5" />
              <span>Joined May 2026</span>
            </div>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  ),
};
