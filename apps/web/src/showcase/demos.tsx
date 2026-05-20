import * as React from 'react';
import { BellIcon, CheckIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@lunofi/ui/accordion';
import { Badge } from '@lunofi/ui/badge';
import { Button } from '@lunofi/ui/button';
import { Checkbox } from '@lunofi/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@lunofi/ui/dialog';
import { Input } from '@lunofi/ui/input';
import { Label } from '@lunofi/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@lunofi/ui/popover';
import { Progress } from '@lunofi/ui/progress';
import { RadioGroup, RadioGroupItem } from '@lunofi/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lunofi/ui/select';
import { Separator } from '@lunofi/ui/separator';
import { Skeleton } from '@lunofi/ui/skeleton';
import { Slider } from '@lunofi/ui/slider';
import { Spinner } from '@lunofi/ui/spinner';
import { Switch } from '@lunofi/ui/switch';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@lunofi/ui/tabs';
import { Textarea } from '@lunofi/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@lunofi/ui/tooltip';

/**
 * Live preview demos keyed by registry item name. Only a curated subset of the
 * registry has a hand-authored live preview; the rest still appear as cards
 * with copy actions, falling back to a quiet placeholder.
 */
const demos: Record<string, () => React.ReactNode> = {
  button: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Error</Badge>
    </div>
  ),
  input: () => (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" type="email" placeholder="you@example.com" />
    </div>
  ),
  textarea: () => (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="demo-msg">Message</Label>
      <Textarea id="demo-msg" placeholder="A few calm words…" rows={3} />
    </div>
  ),
  checkbox: () => (
    <div className="flex flex-col gap-3">
      <Label className="gap-2.5">
        <Checkbox defaultChecked />
        Notify me by email
      </Label>
      <Label className="gap-2.5">
        <Checkbox />
        Subscribe to the changelog
      </Label>
    </div>
  ),
  switch: () => (
    <div className="flex flex-col gap-3">
      <Label className="gap-2.5">
        <Switch defaultChecked />
        Reduced motion
      </Label>
      <Label className="gap-2.5">
        <Switch />
        Compact density
      </Label>
    </div>
  ),
  'radio-group': () => (
    <RadioGroup defaultValue="comfortable">
      {['comfortable', 'compact', 'spacious'].map((value) => (
        <Label key={value} className="gap-2.5 capitalize">
          <RadioGroupItem value={value} />
          {value}
        </Label>
      ))}
    </RadioGroup>
  ),
  slider: () => <Slider defaultValue={[40]} max={100} step={1} className="max-w-xs" />,
  progress: () => <Progress value={62} className="max-w-xs" />,
  spinner: () => (
    <div className="text-muted-foreground flex items-center gap-3">
      <Spinner />
      <span className="text-sm">Loading…</span>
    </div>
  ),
  skeleton: () => (
    <div className="flex w-full max-w-xs items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3.5 w-1/2" />
      </div>
    </div>
  ),
  separator: () => (
    <div className="text-muted-foreground flex h-5 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Components</span>
      <Separator orientation="vertical" />
      <span>Blocks</span>
    </div>
  ),
  select: () => (
    <Select defaultValue="slate">
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="slate">Slate</SelectItem>
        <SelectItem value="stone">Stone</SelectItem>
        <SelectItem value="indigo">Indigo</SelectItem>
      </SelectContent>
    </Select>
  ),
  tabs: () => (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="usage">Usage</TabsTab>
        <TabsTab value="api">API</TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="text-muted-foreground pt-3 text-sm">
        A calm set of layered panels.
      </TabsPanel>
      <TabsPanel value="usage" className="text-muted-foreground pt-3 text-sm">
        Switch panels without losing your place.
      </TabsPanel>
      <TabsPanel value="api" className="text-muted-foreground pt-3 text-sm">
        Driven by Base UI Tabs.
      </TabsPanel>
    </Tabs>
  ),
  accordion: () => (
    <Accordion className="w-full max-w-sm">
      <AccordionItem value="a">
        <AccordionTrigger>Is the code mine to keep?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes — components are copied into your project, not installed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Can I re-theme it?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Override the CSS variables and everything follows.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  dialog: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save changes?</DialogTitle>
          <DialogDescription>
            Your edits will be applied immediately. You can revert at any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  popover: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <PlusIcon aria-hidden />
        New label
      </PopoverTrigger>
      <PopoverContent className="grid gap-2">
        <Label htmlFor="demo-label" className="text-sm">
          Label name
        </Label>
        <Input id="demo-label" placeholder="e.g. priority" />
        <Button size="sm" className="mt-1">
          <CheckIcon aria-hidden />
          Create
        </Button>
      </PopoverContent>
    </Popover>
  ),
  tooltip: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon" />} aria-label="Notifications">
        <BellIcon aria-hidden />
      </TooltipTrigger>
      <TooltipContent>Notifications</TooltipContent>
    </Tooltip>
  ),
  pill: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">
        <span className="bg-primary size-1.5 rounded-full" aria-hidden />
        Stable
      </Badge>
      <Badge variant="outline">
        v0.0.0
        <ChevronRightIcon aria-hidden />
      </Badge>
    </div>
  ),
};

function getDemo(name: string): (() => React.ReactNode) | undefined {
  return demos[name];
}

export { getDemo };
