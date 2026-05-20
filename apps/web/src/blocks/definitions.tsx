import { ArrowRightIcon, CheckIcon } from 'lucide-react';

import { Badge } from '@lunofi/ui/badge';
import { Button } from '@lunofi/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lunofi/ui/card';
import { Field, FieldLabel } from '@lunofi/ui/field';
import { Input } from '@lunofi/ui/input';
import { Label } from '@lunofi/ui/label';
import { Separator } from '@lunofi/ui/separator';
import { Checkbox } from '@lunofi/ui/checkbox';

interface BlockDefinition {
  id: string;
  title: string;
  description: string;
  /** Live preview, composed only from @lunofi/ui components. */
  Preview: () => React.ReactNode;
  /** The literal JSX a user copies — kept in sync with the preview by hand. */
  source: string;
}

const heroSource = `import { ArrowRightIcon } from 'lucide-react';
import { Badge } from '@lunofi/ui/badge';
import { Button } from '@lunofi/ui/button';

export function HeroBlock() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <Badge variant="outline" className="mb-5">
        Now in public beta
      </Badge>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Ship calm interfaces, faster
      </h1>
      <p className="text-muted-foreground mx-auto mt-5 max-w-lg text-lg leading-relaxed text-pretty">
        A quiet component library you copy into your project and own outright. No runtime
        dependency, no lock-in — just clean source.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg">
          Get started
          <ArrowRightIcon aria-hidden />
        </Button>
        <Button size="lg" variant="outline">
          Read the docs
        </Button>
      </div>
    </section>
  );
}`;

const pricingSource = `import { CheckIcon } from 'lucide-react';
import { Badge } from '@lunofi/ui/badge';
import { Button } from '@lunofi/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lunofi/ui/card';
import { Separator } from '@lunofi/ui/separator';

const features = ['Unlimited projects', 'Component source access', 'Calm theme tokens', 'Priority support'];

export function PricingBlock() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <Badge variant="secondary" className="w-fit">Most popular</Badge>
        <CardTitle className="mt-2 text-2xl">
          \\$19<span className="text-muted-foreground text-base font-normal">/month</span>
        </CardTitle>
        <CardDescription>Everything you need to ship a polished product.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <Separator />
        <ul className="space-y-2.5 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <CheckIcon className="text-primary size-4 shrink-0" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full">Choose plan</Button>
      </CardContent>
    </Card>
  );
}`;

const signInSource = `import { Button } from '@lunofi/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lunofi/ui/card';
import { Checkbox } from '@lunofi/ui/checkbox';
import { Field, FieldLabel } from '@lunofi/ui/field';
import { Input } from '@lunofi/ui/input';
import { Label } from '@lunofi/ui/label';

export function SignInBlock() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to continue to your workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="you@example.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
          <Label className="gap-2.5 text-sm font-normal">
            <Checkbox defaultChecked />
            Keep me signed in
          </Label>
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </CardContent>
    </Card>
  );
}`;

const features = [
  'Unlimited projects',
  'Component source access',
  'Calm theme tokens',
  'Priority support',
];

const blocks: BlockDefinition[] = [
  {
    id: 'hero',
    title: 'Hero',
    description: 'A centered marketing hero with badge, headline, and dual call-to-action.',
    source: heroSource,
    Preview: () => (
      <section className="mx-auto max-w-2xl px-6 py-12 text-center sm:py-16">
        <Badge variant="outline" className="mb-5">
          Now in public beta
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Ship calm interfaces, faster
        </h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-lg leading-relaxed text-pretty">
          A quiet component library you copy into your project and own outright. No runtime
          dependency, no lock-in — just clean source.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">
            Get started
            <ArrowRightIcon aria-hidden />
          </Button>
          <Button size="lg" variant="outline">
            Read the docs
          </Button>
        </div>
      </section>
    ),
  },
  {
    id: 'pricing',
    title: 'Pricing card',
    description: 'A single pricing tier card with feature list and a primary action.',
    source: pricingSource,
    Preview: () => (
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Most popular
          </Badge>
          <CardTitle className="mt-2 text-2xl">
            $19<span className="text-muted-foreground text-base font-normal">/month</span>
          </CardTitle>
          <CardDescription>Everything you need to ship a polished product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Separator />
          <ul className="space-y-2.5 text-sm">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <CheckIcon className="text-primary size-4 shrink-0" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full">Choose plan</Button>
        </CardContent>
      </Card>
    ),
  },
  {
    id: 'sign-in',
    title: 'Sign-in card',
    description: 'A compact authentication card built from Field, Input, Checkbox, and Button.',
    source: signInSource,
    Preview: () => (
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue to your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <Field>
              <FieldLabel htmlFor="block-email">Email</FieldLabel>
              <Input id="block-email" type="email" placeholder="you@example.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="block-password">Password</FieldLabel>
              <Input id="block-password" type="password" placeholder="••••••••" />
            </Field>
            <Label className="gap-2.5 text-sm font-normal">
              <Checkbox defaultChecked />
              Keep me signed in
            </Label>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    ),
  },
];

export { blocks };
export type { BlockDefinition };
