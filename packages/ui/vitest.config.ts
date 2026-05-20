import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirName = dirname(fileURLToPath(import.meta.url));

// Storybook component-library testing: every story runs as a test in a real
// Chromium browser so computed styles (the calm OKLCH theme) and Base UI
// portals behave exactly as they do in Storybook. Run with:
//   npx vitest --project storybook run
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: join(dirName, '.storybook'),
            // Build is used over a dev server during CI/headless runs.
            storybookScript: 'pnpm run build-storybook --quiet',
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
