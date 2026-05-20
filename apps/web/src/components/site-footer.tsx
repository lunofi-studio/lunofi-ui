import { Link } from 'react-router-dom';

import { Logo } from '@/components/logo';
import { GITHUB_URL } from '@/components/site-header';

function SiteFooter() {
  return (
    <footer className="border-border/70 mt-24 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-2">
          <Logo />
          <p className="text-muted-foreground max-w-sm text-sm text-pretty">
            Calm, copy-paste components built on Base UI and Tailwind CSS. You own the code.
          </p>
        </div>
        <nav className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link to="/docs/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <Link to="/blocks" className="hover:text-foreground transition-colors">
            Blocks
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a href="/r/index.json" className="hover:text-foreground transition-colors">
            Registry
          </a>
        </nav>
      </div>
    </footer>
  );
}

export { SiteFooter };
