import { create } from 'storybook/theming';

/*
 * The lunofi calm palette, converted from the OKLCH tokens in
 * packages/tailwind/tokens.css to concrete hex values. Storybook's manager runs
 * outside the app's Tailwind CSS, so it can't read the CSS variables — these are
 * hand-converted approximations of the same warm-neutral surfaces and the
 * low-chroma slate-indigo accent. Exactness isn't critical for the chrome.
 */
const palette = {
  // Slate-indigo accent (--primary oklch(0.52 0.07 264)) + a calmer companion.
  primary: '#546992',
  secondary: '#568999',
  // Warm near-neutral surfaces (--background / --card / --sidebar).
  appBg: '#f9f8f6',
  contentBg: '#ffffff',
  // --border oklch(0.92 0.004 95).
  border: '#e5e4e2',
  // --foreground / --muted-foreground.
  text: '#1b1b17',
  textMuted: '#706f68',
  // --accent / --accent-foreground for the toolbar selection.
  accent: '#eaeff7',
  accentText: '#2b3852',
} as const;

export const lunofiTheme = create({
  base: 'light',

  brandTitle: 'lunofi-ui',
  brandUrl: 'https://github.com/Shironex/lunofi-ui',
  brandTarget: '_self',

  colorPrimary: palette.primary,
  colorSecondary: palette.secondary,

  // App surfaces.
  appBg: palette.appBg,
  appContentBg: palette.contentBg,
  appPreviewBg: palette.contentBg,
  appBorderColor: palette.border,
  appBorderRadius: 10, // matches --radius (0.625rem).

  // Typography — Geist, matching the app's --font-sans.
  fontBase: "'Geist Variable', ui-sans-serif, system-ui, sans-serif",
  fontCode: "ui-monospace, 'SFMono-Regular', 'Menlo', monospace",

  textColor: palette.text,
  textInverseColor: '#ffffff',
  textMutedColor: palette.textMuted,

  // Toolbar / top bar.
  barBg: palette.contentBg,
  barTextColor: palette.textMuted,
  barSelectedColor: palette.primary,
  barHoverColor: palette.primary,

  // Form inputs.
  inputBg: '#ffffff',
  inputBorder: palette.border,
  inputTextColor: palette.text,
  inputBorderRadius: 8,
});
