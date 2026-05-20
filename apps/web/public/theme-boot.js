/* global window, document, localStorage */
// Flicker-free theme: apply the .dark class synchronously before React renders.
// Loaded from index.html as an external script so a strict CSP can keep
// script-src 'self' without permitting 'unsafe-inline'.
(function () {
  try {
    var stored = localStorage.getItem('lunofi-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  } catch {
    // Ignore storage/parse errors — fall back to the light default.
  }
})();
