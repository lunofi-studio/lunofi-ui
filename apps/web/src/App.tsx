import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { BlocksPage } from '@/pages/blocks';
import { ComponentDetailPage } from '@/pages/component-detail';
import { DocsLayout } from '@/pages/docs-layout';
import { DocsOverviewPage } from '@/pages/docs-overview';
import { LandingPage } from '@/pages/landing';
import { NotFoundPage } from '@/pages/not-found';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    // `isolation: isolate` creates a stacking context at the app root so Base UI
    // portals (dialogs, popovers, tooltips) layer correctly above page content.
    <div className="isolate flex min-h-dvh flex-col">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs/components" element={<DocsLayout />}>
            <Route index element={<DocsOverviewPage />} />
            <Route path=":name" element={<ComponentDetailPage />} />
          </Route>
          {/* Keep the old top-level path working as a redirect into the docs. */}
          <Route path="/components" element={<Navigate to="/docs/components" replace />} />
          <Route path="/components/:name" element={<RedirectComponent />} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

/** Redirect legacy `/components/:name` deep links to the new docs route. */
function RedirectComponent() {
  const { pathname } = useLocation();
  const name = pathname.split('/').pop() ?? '';
  return <Navigate to={`/docs/components/${name}`} replace />;
}

export { App };
