import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { BlocksPage } from '@/pages/blocks';
import { ComponentsPage } from '@/pages/components';
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
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export { App };
