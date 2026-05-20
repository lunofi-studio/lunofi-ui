import * as React from 'react';
import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { bundledLanguages } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';

/**
 * Languages and themes the docs site highlights. Kept deliberately small —
 * only the grammars the registry source and snippets use, and one calm
 * light/dark theme pair. Each entry is a lazy importer, so Vite code-splits
 * the grammar and theme payloads out of the main bundle.
 */
type HighlightLang = 'tsx' | 'bash';

const LIGHT_THEME = 'github-light';
const DARK_THEME = 'github-dark';

let highlighterPromise: Promise<HighlighterCore> | null = null;

/**
 * Create (once) a fine-grained Shiki highlighter using the pure-JS regex
 * engine — no WebAssembly fetch — loaded with just the tsx + bash grammars and
 * the github light/dark theme pair. The promise is memoized so every code
 * block shares a single highlighter instance.
 */
function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [bundledThemes[LIGHT_THEME], bundledThemes[DARK_THEME]],
    langs: [bundledLanguages.tsx, bundledLanguages.bash],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighterPromise;
}

/**
 * Highlight `code` to a dual-theme HTML string. The output carries inline
 * `color` (light) plus `--shiki-dark` custom properties (dark); the stylesheet
 * swaps to the dark values under the `.dark` class, so toggling the site theme
 * needs no re-highlight.
 */
async function highlightToHtml(code: string, lang: HighlightLang): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: LIGHT_THEME, dark: DARK_THEME },
    defaultColor: 'light',
  });
}

type HighlightState =
  | { status: 'pending' }
  | { status: 'ready'; html: string }
  | { status: 'error' };

type Resolved =
  | { status: 'ready'; code: string; lang: HighlightLang; html: string }
  | { status: 'error'; code: string; lang: HighlightLang };

/**
 * Highlight `code` for rendering. While the highlighter loads (or if it fails)
 * the caller falls back to plain, escaped text so the source is always
 * readable and copyable.
 *
 * The latest resolved result is keyed by its `code`+`lang`; if the requested
 * input differs from what resolved, we report `pending` at render time rather
 * than resetting state inside the effect (which would trigger cascading
 * renders).
 */
function useHighlighted(code: string, lang: HighlightLang): HighlightState {
  const [resolved, setResolved] = React.useState<Resolved | null>(null);

  React.useEffect(() => {
    let active = true;
    highlightToHtml(code, lang)
      .then((html) => {
        if (active) setResolved({ status: 'ready', code, lang, html });
      })
      .catch(() => {
        if (active) setResolved({ status: 'error', code, lang });
      });
    return () => {
      active = false;
    };
  }, [code, lang]);

  if (resolved && resolved.code === code && resolved.lang === lang) {
    return resolved.status === 'ready'
      ? { status: 'ready', html: resolved.html }
      : { status: 'error' };
  }
  return { status: 'pending' };
}

export { getHighlighter, highlightToHtml, useHighlighted };
export type { HighlightLang, HighlightState };
