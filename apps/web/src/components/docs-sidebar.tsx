import * as React from 'react';
import { MenuIcon, PanelLeftIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Button } from '@lunofi/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@lunofi/ui/drawer';
import { cn } from '@lunofi/ui/lib/utils';

import { groupByCategory, type RegistryIndexItem } from '@/lib/registry';

interface DocsNavProps {
  items: RegistryIndexItem[];
  /** Called after a link is chosen — used to close the mobile drawer. */
  onNavigate?: () => void;
}

/**
 * The grouped component navigation. Renders an "Overview" link followed by each
 * category as a labelled section. Reused by both the desktop rail and the
 * mobile drawer.
 */
function DocsNav({ items, onNavigate }: DocsNavProps) {
  const groups = React.useMemo(() => groupByCategory(items), [items]);

  return (
    <nav className="flex flex-col gap-6 text-sm" aria-label="Components">
      <div className="flex flex-col gap-0.5">
        <NavLink to="/docs/components" end onClick={onNavigate} className={navLinkClass}>
          Overview
        </NavLink>
      </div>

      {groups.map((group) => (
        <div key={group.category} className="flex flex-col gap-1">
          <p className="text-muted-foreground/80 px-2 text-xs font-medium tracking-wide uppercase">
            {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <NavLink
                key={item.name}
                to={`/docs/components/${item.name}`}
                onClick={onNavigate}
                className={navLinkClass}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function navLinkClass({ isActive }: { isActive: boolean }): string {
  return cn(
    'rounded-md px-2 py-1.5 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
    isActive
      ? 'bg-accent text-accent-foreground font-medium'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
  );
}

/** Desktop sidebar: a sticky, independently scrollable rail. */
function DocsSidebar({ items }: { items: RegistryIndexItem[] }) {
  return (
    <aside className="border-border/70 hidden w-60 shrink-0 border-r lg:block">
      <div className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-3 py-8">
        <DocsNav items={items} />
      </div>
    </aside>
  );
}

/** Mobile trigger + drawer that mirrors the desktop nav. */
function DocsSidebarMobile({ items }: { items: RegistryIndexItem[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" size="sm" />}>
          <MenuIcon aria-hidden />
          Components
        </DrawerTrigger>
        <DrawerContent side="left" className="w-72">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <PanelLeftIcon className="size-4" aria-hidden />
              Components
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-3 pb-8">
            <DrawerClose className="sr-only">Close</DrawerClose>
            <DocsNav items={items} onNavigate={() => setOpen(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export { DocsNav, DocsSidebar, DocsSidebarMobile };
