import type * as React from 'react';
import {
  ArrowRightIcon,
  BlocksIcon,
  CopyIcon,
  LayersIcon,
  PaletteIcon,
  SparklesIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@lunofi/ui/badge';
import { Button } from '@lunofi/ui/button';
import { cn } from '@lunofi/ui/lib/utils';

import { CodeBlock } from '@/components/code-block';
import { GITHUB_URL } from '@/components/site-header';
import { installCommand } from '@/lib/registry';
import { getDemo } from '@/showcase/demos';

const valueProps = [
  {
    icon: LayersIcon,
    title: 'Built on Base UI',
    body: 'Accessible behaviour, focus management, and portals come from Base UI primitives — not reinvented. You get correct semantics for free.',
  },
  {
    icon: PaletteIcon,
    title: 'Re-themes with CSS variables',
    body: 'A single calm OKLCH token set drives every component. Override the variables and the whole library follows — no fork, no config churn.',
  },
  {
    icon: CopyIcon,
    title: 'You own the code',
    body: 'Components are copied into your project, not installed as a dependency. Read them, edit them, keep them. Nothing is hidden behind a package.',
  },
];

const quickStartSteps = [
  {
    step: '1',
    title: 'Initialize your project',
    body: 'Set up the calm theme tokens and your components directory.',
    command: 'npx lunofi init',
  },
  {
    step: '2',
    title: 'Add a component',
    body: "Pull any component's source straight into your project. Repeat for as many as you need.",
    command: installCommand('button'),
  },
];

const featuredComponents = ['button', 'select', 'switch', 'tabs'];

function LandingPage() {
  return (
    <>
      <Hero />
      <QuickStart />
      <ValueProps />
      <ThemingNote />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="bg-dotted pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_75%)]"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <div className="max-w-2xl">
          <Link
            to="/docs/components"
            className="reveal text-muted-foreground hover:text-foreground hover:border-border/80 group bg-card/60 focus-visible:ring-ring/50 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors outline-none focus-visible:ring-[3px]"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
          >
            <span className="bg-primary size-1.5 rounded-full" aria-hidden />
            36 components in the registry
            <ArrowRightIcon
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>

          <h1
            className="reveal mt-7 text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            Calm components.
            <br />
            <span className="text-muted-foreground">Yours to customize.</span>
          </h1>

          <p
            className="reveal text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty"
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            A quiet, copy-paste UI library built on Base UI and Tailwind CSS. Low-chroma by default,
            restrained in motion, and re-themeable down to a single CSS variable. Copy the source
            into your <code className="text-foreground/80 font-mono text-[0.9em]">ui/</code> folder
            and make it your own.
          </p>

          <div
            className="reveal mt-9 max-w-md"
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            <CodeBlock code={installCommand('button')} emphasis />
            <p className="text-muted-foreground mt-2 text-xs">
              Already set up? Add any component with the <span className="font-mono">lunofi</span>{' '}
              CLI — see the quick start below.
            </p>
          </div>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-3"
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
          >
            <Button size="lg" render={<Link to="/docs/components" />}>
              Browse components
              <ArrowRightIcon aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" />}
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 sm:pt-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-20">
          <Badge variant="outline" className="mb-4">
            Quick start
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Two commands to your first component.
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            lunofi-ui is a registry, not a runtime. The CLI copies real source files into your
            project — you commit them, edit them, and own them. No package to update, nothing
            hidden.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button render={<Link to="/docs/components" />}>
              Read the docs
              <ArrowRightIcon aria-hidden />
            </Button>
            <Button variant="ghost" render={<Link to="/docs/components/button" />}>
              See the Button page
            </Button>
          </div>
        </div>

        <ol className="flex flex-col gap-6">
          {quickStartSteps.map((step) => (
            <li key={step.step} className="bg-card flex gap-4 rounded-xl border p-5 sm:p-6">
              <span className="bg-accent text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                {step.step}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty">
                  {step.body}
                </p>
                <div className="mt-3">
                  <CodeBlock code={step.command} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <FeaturedComponents />
    </section>
  );
}

function FeaturedComponents() {
  return (
    <div className="mt-14">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="font-medium tracking-tight">Featured components</h3>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">
            A glance at what you get — every one is live and interactive in the docs.
          </p>
        </div>
        <Link
          to="/docs/components"
          className="text-muted-foreground hover:text-foreground hidden items-center gap-1.5 text-sm transition-colors sm:inline-flex"
        >
          View all
          <ArrowRightIcon className="size-3.5" aria-hidden />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredComponents.map((name) => {
          const demo = getDemo(name);
          return (
            <article key={name} className="bg-card flex flex-col overflow-hidden rounded-xl border">
              <div className="flex min-h-32 flex-1 items-center justify-center p-5">{demo?.()}</div>
              <Link
                to={`/docs/components/${name}`}
                className="group text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:ring-ring/50 flex items-center justify-between gap-2 border-t px-4 py-2.5 text-sm capitalize outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-inset"
              >
                {name.replace(/-/g, ' ')}
                <ArrowRightIcon
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ValueProps() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8">
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
        {valueProps.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-card flex flex-col gap-3 p-7">
            <span className="text-primary bg-accent flex size-9 items-center justify-center rounded-lg">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <h3 className="font-medium tracking-tight">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ThemingNote() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="outline" className="mb-4">
            <SparklesIcon aria-hidden />
            Theming
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            One token set. Every component follows.
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            The calm look is just CSS variables — a warm near-neutral surface and a soft
            slate-indigo accent. Re-tune them in your own stylesheet and the entire library shifts
            with you. No component edits, no rebuild step.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {[
              'Light and dark handled by a single .dark class',
              'OKLCH tokens tuned for low chroma and easy contrast',
              'Ship your brand by overriding --primary and friends',
            ].map((item) => (
              <li key={item} className="text-muted-foreground flex items-start gap-2.5">
                <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
          <div className="border-b px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="bg-border size-2.5 rounded-full" aria-hidden />
              <span className="bg-border size-2.5 rounded-full" aria-hidden />
              <span className="bg-border size-2.5 rounded-full" aria-hidden />
              <span className="text-muted-foreground ml-2 font-mono text-xs">theme.css</span>
            </div>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed">
            <code>
              <ThemeLine variable="--background" value="oklch(0.99 0.002 95)" />
              <ThemeLine variable="--foreground" value="oklch(0.22 0.006 95)" />
              <ThemeLine variable="--primary" value="oklch(0.52 0.07 264)" swatch="bg-primary" />
              <ThemeLine variable="--accent" value="oklch(0.95 0.012 264)" swatch="bg-accent" />
              <ThemeLine variable="--border" value="oklch(0.92 0.004 95)" />
              <ThemeLine variable="--radius" value="0.625rem" />
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function ThemeLine({
  variable,
  value,
  swatch,
}: {
  variable: string;
  value: string;
  swatch?: string;
}) {
  return (
    <div className="flex items-center gap-2 whitespace-pre">
      <span className="text-foreground/80">{`  ${variable}: `}</span>
      <span className="text-muted-foreground">{value};</span>
      {swatch && (
        <span
          className={cn('ml-1 inline-block size-3 rounded-full border align-middle', swatch)}
          aria-hidden
        />
      )}
    </div>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8">
      <div className="bg-card relative overflow-hidden rounded-2xl border px-7 py-12 text-center sm:px-12 sm:py-16">
        <div
          className="bg-dotted pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000,transparent)]"
          aria-hidden
        />
        <div className="relative">
          <span className="text-primary bg-accent mx-auto flex size-11 items-center justify-center rounded-xl">
            <BlocksIcon className="size-5" aria-hidden />
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Start with a block, keep what you copy.
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-lg leading-relaxed text-pretty">
            Composed sections assembled entirely from lunofi-ui components. Copy the JSX, drop it
            in, and adjust to taste.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link to="/blocks" />}>
              Explore blocks
              <ArrowRightIcon aria-hidden />
            </Button>
            <Button size="lg" variant="ghost" render={<Link to="/docs/components" />}>
              Or browse components
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingPage };
