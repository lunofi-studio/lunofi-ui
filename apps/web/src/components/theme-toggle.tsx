import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@lunofi/ui/button';

import { useTheme } from '@/lib/theme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <MoonIcon aria-hidden /> : <SunIcon aria-hidden />}
    </Button>
  );
}

export { ThemeToggle };
