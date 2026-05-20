import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/manager-api';

import { darkTheme, lightTheme } from './theme';

/*
 * Keep the Storybook manager chrome (sidebar, toolbar, search, panels) in sync
 * with the addon-themes light/dark toolbar toggle.
 *
 * The toggle drives the `theme` global (addon-themes' GLOBAL_KEY, values
 * `light` | `dark`, see preview.ts). Re-calling `addons.setConfig({ theme })`
 * emits SET_CONFIG on the channel, which the manager-api layout module listens
 * for and re-applies as `state.theme` — re-rendering the manager ThemeProvider
 * live. We listen on the channel for global changes and re-apply the matching
 * manager theme:
 *   - SET_GLOBALS fires once the preview boots, carrying the initial globals.
 *   - GLOBALS_UPDATED fires every time the toolbar toggle changes a global.
 */

const themeForGlobal = (theme: unknown) => (theme === 'dark' ? darkTheme : lightTheme);

// Initial chrome matches the addon-themes `defaultTheme: 'light'`.
addons.setConfig({ theme: lightTheme });

addons.register('lunofi/manager-theme-sync', () => {
  const channel = addons.getChannel();

  const applyFromGlobals = (globals?: Record<string, unknown>) => {
    addons.setConfig({ theme: themeForGlobal(globals?.theme) });
  };

  channel.on(SET_GLOBALS, ({ globals }) => applyFromGlobals(globals));
  channel.on(GLOBALS_UPDATED, ({ globals }) => applyFromGlobals(globals));
});
