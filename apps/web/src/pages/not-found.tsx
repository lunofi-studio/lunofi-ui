import { Link } from 'react-router-dom';

import { Button } from '@lunofi/ui/button';

function NotFoundPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-32 text-center sm:px-8">
      <p className="text-muted-foreground font-mono text-sm">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">This page wandered off.</h1>
      <p className="text-muted-foreground mt-2 max-w-sm text-pretty">
        The page you were looking for doesn&apos;t exist. Head back and pick a calmer path.
      </p>
      <Button className="mt-7" render={<Link to="/" />}>
        Back home
      </Button>
    </section>
  );
}

export { NotFoundPage };
