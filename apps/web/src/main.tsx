import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { PackageManagerProvider } from '@/lib/package-manager';
import { ThemeProvider } from '@/lib/theme';
import './styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <PackageManagerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PackageManagerProvider>
    </ThemeProvider>
  </StrictMode>,
);
