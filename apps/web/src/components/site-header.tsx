import { GithubIcon } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

import { Button } from '@lunofi/ui/button';
import { cn } from '@lunofi/ui/lib/utils';

import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const GITHUB_URL = 'https://github.com/lunofi-ui/lunofi-ui';

const navItems = [
  { to: '/components', label: 'Components' },
  { to: '/blocks', label: 'Blocks' },
];

function SiteHeader() {
  return (
    <header className="border-border/70 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link
          to="/"
          className="rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            render={<a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" />}
            aria-label="lunofi-ui on GitHub"
            title="GitHub"
          >
            <GithubIcon aria-hidden />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader, GITHUB_URL };
