import { config as baseConfig } from '@lunofi/eslint-config/base';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  ...baseConfig,
  {
    files: ['src/**/*.ts', 'scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
