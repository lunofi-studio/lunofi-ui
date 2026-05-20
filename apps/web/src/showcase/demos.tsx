import * as React from 'react';
import {
  BellIcon,
  BoldIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  ItalicIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  UnderlineIcon,
  UserIcon,
} from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@lunofi/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@lunofi/ui/alert-dialog';
import {
  Announcement,
  AnnouncementArrow,
  AnnouncementTag,
  AnnouncementTitle,
} from '@lunofi/ui/announcement';
import { Badge } from '@lunofi/ui/badge';
import {
  Banner,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@lunofi/ui/banner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@lunofi/ui/breadcrumb';
import { Button } from '@lunofi/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@lunofi/ui/card';
import { Checkbox } from '@lunofi/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@lunofi/ui/collapsible';
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@lunofi/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@lunofi/ui/dropdown-menu';
import { Field, FieldDescription, FieldLabel } from '@lunofi/ui/field';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@lunofi/ui/form';
import { Input } from '@lunofi/ui/input';
import { Label } from '@lunofi/ui/label';
import { Pill } from '@lunofi/ui/pill';
import { Popover, PopoverContent, PopoverTrigger } from '@lunofi/ui/popover';
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from '@lunofi/ui/preview-card';
import { Progress } from '@lunofi/ui/progress';
import { RadioGroup, RadioGroupItem } from '@lunofi/ui/radio-group';
import { ScrollArea } from '@lunofi/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lunofi/ui/select';
import { Separator } from '@lunofi/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@lunofi/ui/sheet';
import { Skeleton } from '@lunofi/ui/skeleton';
import { Slider } from '@lunofi/ui/slider';
import { Spinner } from '@lunofi/ui/spinner';
import { Switch } from '@lunofi/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@lunofi/ui/table';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@lunofi/ui/tabs';
import { Textarea } from '@lunofi/ui/textarea';
import { Toggle } from '@lunofi/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@lunofi/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@lunofi/ui/tooltip';

import { breadcrumbTrail, changelog, invoices, team, timezones } from '@/showcase/mock-data';

/**
 * Live, interactive preview demos keyed by registry item name. Every
 * installable component has a hand-authored preview using sample/mock data —
 * there is no placeholder fallback. Overlays render a trigger that opens the
 * real surface; data components use the shared mock data.
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
  pill: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Pill variant="success" dot>
        Stable
      </Pill>
      <Pill variant="info">v0.3.0</Pill>
      <Pill variant="outline">Beta</Pill>
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
  label: () => (
    <div className="flex flex-col gap-3">
      <Label htmlFor="demo-label-input">Display name</Label>
      <Input id="demo-label-input" defaultValue="lunofi" className="max-w-xs" />
      <Label className="gap-2.5">
        <Checkbox defaultChecked />
        Labels can wrap a control too
      </Label>
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
  toggle: () => {
    const Demo = () => {
      const [pressed, setPressed] = React.useState(true);
      return (
        <Toggle
          aria-label="Toggle bold"
          variant="outline"
          pressed={pressed}
          onPressedChange={setPressed}
        >
          <BoldIcon aria-hidden />
          Bold
        </Toggle>
      );
    };
    return <Demo />;
  },
  'toggle-group': () => {
    const Demo = () => {
      const [value, setValue] = React.useState<string[]>(['bold']);
      return (
        <ToggleGroup variant="outline" value={value} onValueChange={setValue} aria-label="Format">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <BoldIcon aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <ItalicIcon aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <UnderlineIcon aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      );
    };
    return <Demo />;
  },
  select: () => (
    <Select defaultValue="utc">
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Timezone" />
      </SelectTrigger>
      <SelectContent>
        {timezones.map((tz) => (
          <SelectItem key={tz.value} value={tz.value}>
            {tz.label}
          </SelectItem>
        ))}
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
  collapsible: () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm">
          <CollapsibleTrigger
            render={<Button variant="outline" size="sm" className="w-full justify-between" />}
          >
            Recent activity
            <ChevronRightIcon
              className={open ? 'rotate-90 transition-transform' : 'transition-transform'}
              aria-hidden
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="text-muted-foreground mt-2 space-y-1.5 rounded-lg border p-3 text-sm">
              {changelog.slice(0, 3).map((entry) => (
                <li key={entry.version} className="flex gap-2">
                  <span className="text-foreground font-mono text-xs">{entry.version}</span>
                  {entry.note}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      );
    };
    return <Demo />;
  },
  card: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Monthly usage</CardTitle>
        <CardDescription>You&apos;re on the calm plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={62} />
        <p className="text-muted-foreground mt-2 text-sm">6,200 of 10,000 requests used.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Manage plan
        </Button>
      </CardFooter>
    </Card>
  ),
  'scroll-area': () => (
    <ScrollArea className="h-44 w-full max-w-xs rounded-lg border">
      <div className="p-4">
        <p className="text-foreground mb-3 text-sm font-medium">Team</p>
        <ul className="space-y-3">
          {[...team, ...team].map((member, i) => (
            <li key={`${member.name}-${i}`} className="flex items-center gap-3">
              <span className="bg-accent text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                {member.initials}
              </span>
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm">{member.name}</p>
                <p className="text-muted-foreground text-xs">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  ),
  table: () => (
    <Table className="w-full max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === 'Paid'
                    ? 'secondary'
                    : invoice.status === 'Overdue'
                      ? 'destructive'
                      : 'outline'
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  breadcrumb: () => (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbTrail.map((crumb, i) => {
          const isLast = i === breadcrumbTrail.length - 1;
          return (
            <React.Fragment key={crumb}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  ),
  announcement: () => (
    <Announcement href="#">
      <AnnouncementTag>New</AnnouncementTag>
      <AnnouncementTitle>Drawer &amp; Sheet just landed</AnnouncementTitle>
      <AnnouncementArrow />
    </Announcement>
  ),
  banner: () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(true);
      if (!open) {
        return (
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Show banner
          </Button>
        );
      }
      return (
        <Banner variant="info" className="max-w-md">
          <BannerIcon variant="info" />
          <BannerContent>
            <BannerTitle>Scheduled maintenance</BannerTitle>
            <BannerDescription>
              We&apos;ll be offline briefly on Sunday at 02:00 UTC.
            </BannerDescription>
          </BannerContent>
          <BannerClose onClose={() => setOpen(false)} />
        </Banner>
      );
    };
    return <Demo />;
  },
  form: () => (
    <Form className="w-full max-w-xs">
      <FormField
        name="email"
        validate={(value) =>
          typeof value === 'string' && value.includes('@') ? null : 'Enter a valid email.'
        }
      >
        <FormLabel>Work email</FormLabel>
        <FormControl render={<Input type="email" required placeholder="you@example.com" />} />
        <FormMessage />
      </FormField>
      <Button type="submit" size="sm" className="w-fit">
        Subscribe
      </Button>
    </Form>
  ),
  field: () => (
    <Field className="w-full max-w-xs">
      <FieldLabel>API key name</FieldLabel>
      <Input placeholder="production-key" />
      <FieldDescription>Used to identify this key in your dashboard.</FieldDescription>
    </Field>
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
  'alert-dialog': () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        <TrashIcon aria-hidden />
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the project and all of its data. This action can&apos;t be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  drawer: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Refine what you see in the list.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4">
          <Label className="gap-2.5">
            <Checkbox defaultChecked />
            Paid invoices
          </Label>
          <Label className="gap-2.5">
            <Checkbox />
            Pending invoices
          </Label>
          <Label className="gap-2.5">
            <Checkbox />
            Overdue invoices
          </Label>
        </div>
        <DrawerFooter>
          <Button>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  sheet: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Account</SheetTitle>
          <SheetDescription>Manage your profile and preferences.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 text-sm">
          <a href="#" className="hover:bg-muted rounded-md px-2 py-1.5">
            Profile
          </a>
          <a href="#" className="hover:bg-muted rounded-md px-2 py-1.5">
            Billing
          </a>
          <a href="#" className="hover:bg-muted rounded-md px-2 py-1.5">
            Notifications
          </a>
        </nav>
        <SheetFooter>
          <Button variant="outline">Sign out</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  popover: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <PlusIcon aria-hidden />
        New label
      </PopoverTrigger>
      <PopoverContent className="grid gap-2">
        <Label htmlFor="demo-label-name" className="text-sm">
          Label name
        </Label>
        <Input id="demo-label-name" placeholder="e.g. priority" />
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
  'preview-card': () => (
    <p className="text-muted-foreground text-sm">
      Built by the{' '}
      <PreviewCard>
        <PreviewCardTrigger
          render={<a href="#" className="text-foreground underline underline-offset-4" />}
        >
          lunofi team
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="flex items-center gap-3">
            <span className="bg-accent text-primary flex size-10 items-center justify-center rounded-full text-sm font-medium">
              LU
            </span>
            <div>
              <p className="text-foreground text-sm font-medium">lunofi</p>
              <p className="text-muted-foreground text-xs">Calm, copy-paste UI</p>
            </div>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">
            A quiet component library built on Base UI and Tailwind CSS.
          </p>
        </PreviewCardContent>
      </PreviewCard>
      .
    </p>
  ),
  'dropdown-menu': () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Options
        <ChevronRightIcon className="rotate-90" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon aria-hidden />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon aria-hidden />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon aria-hidden />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon aria-hidden />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function getDemo(name: string): (() => React.ReactNode) | undefined {
  return demos[name];
}

export { getDemo };
