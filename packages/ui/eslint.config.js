import { config as reactConfig } from '@lunofi/eslint-config/react';

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: ['storybook-static/**', 'dist/**', 'node_modules/**'] },
  ...reactConfig,
  {
    files: ['**/*.stories.{ts,tsx}', '**/.storybook/**/*.{ts,tsx}'],
    rules: {
      // Storybook story render functions and decorators legitimately call hooks inline.
      'react-hooks/rules-of-hooks': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];
