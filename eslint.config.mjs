import { config as baseConfig } from '@lunofi/eslint-config/base';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/storybook-static/**', '**/public/r/**'] },
  ...baseConfig,
  {
    // CommonJS config files (commitlint.config.cjs, *.config.cjs, etc.) — give
    // them node globals + commonjs source type when lint-staged runs eslint
    // from the monorepo root.
    files: ['**/*.config.{js,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
];
