import { create } from 'storybook/theming';

/*
 * The lunofi calm palette, converted from the OKLCH tokens in
 * packages/tailwind/tokens.css to concrete hex values. Storybook's manager runs
 * outside the app's Tailwind CSS, so it can't read the CSS variables — these are
 * hand-converted approximations of the same warm-neutral surfaces and the
 * low-chroma slate-indigo accent. Exactness isn't critical for the chrome.
 */
const lightPalette = {
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

/*
 * Calm dark variant, converted from the `.dark { ... }` block in
 * packages/tailwind/tokens.css. The accent stays the same slate-indigo hue,
 * lifted in lightness (--primary oklch(0.72 0.07 264) -> #8ea5d1).
 */
const darkPalette = {
  primary: '#8ea5d1',
  secondary: '#7fb0c0',
  // --background oklch(0.2 0.004 95) / --card oklch(0.22 0.004 95).
  appBg: '#171614',
  contentBg: '#1b1b19',
  // --border oklch(0.3 0.005 95).
  border: '#2e2e2b',
  // --foreground oklch(0.96 0.003 95) / --muted-foreground oklch(0.7 0.01 95).
  text: '#f2f2ef',
  textMuted: '#a09e98',
  // --accent oklch(0.3 0.02 264).
  accent: '#292e38',
  accentText: '#f2f2ef',
} as const;

// Brand/typography/radius are identical across both modes for a consistent feel.
const shared = {
  brandTitle: 'lunofi-ui',
  brandUrl: 'https://github.com/Shironex/lunofi-ui',
  brandTarget: '_self',

  appBorderRadius: 10, // matches --radius (0.625rem).
  inputBorderRadius: 8,

  // Typography — Geist, matching the app's --font-sans.
  fontBase: "'Geist Variable', ui-sans-serif, system-ui, sans-serif",
  fontCode: "ui-monospace, 'SFMono-Regular', 'Menlo', monospace",
} as const;

export const lightTheme = create({
  base: 'light',
  ...shared,

  colorPrimary: lightPalette.primary,
  colorSecondary: lightPalette.secondary,

  // App surfaces.
  appBg: lightPalette.appBg,
  appContentBg: lightPalette.contentBg,
  appPreviewBg: lightPalette.contentBg,
  appBorderColor: lightPalette.border,

  textColor: lightPalette.text,
  textInverseColor: '#ffffff',
  textMutedColor: lightPalette.textMuted,

  // Toolbar / top bar.
  barBg: lightPalette.contentBg,
  barTextColor: lightPalette.textMuted,
  barSelectedColor: lightPalette.primary,
  barHoverColor: lightPalette.primary,

  // Form inputs.
  inputBg: '#ffffff',
  inputBorder: lightPalette.border,
  inputTextColor: lightPalette.text,
});

export const darkTheme = create({
  base: 'dark',
  ...shared,

  colorPrimary: darkPalette.primary,
  colorSecondary: darkPalette.secondary,

  // App surfaces.
  appBg: darkPalette.appBg,
  appContentBg: darkPalette.contentBg,
  appPreviewBg: darkPalette.contentBg,
  appBorderColor: darkPalette.border,

  textColor: darkPalette.text,
  textInverseColor: darkPalette.appBg,
  textMutedColor: darkPalette.textMuted,

  // Toolbar / top bar.
  barBg: darkPalette.contentBg,
  barTextColor: darkPalette.textMuted,
  barSelectedColor: darkPalette.primary,
  barHoverColor: darkPalette.primary,

  // Form inputs.
  inputBg: darkPalette.appBg,
  inputBorder: darkPalette.border,
  inputTextColor: darkPalette.text,
});

/**
 * The light theme is the default chrome theme. Kept as a named export for the
 * docs addon (which themes its own chrome statically).
 */
export const lunofiTheme = lightTheme;
