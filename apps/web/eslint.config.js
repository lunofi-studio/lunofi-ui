import { config as reactConfig } from '@lunofi/eslint-config/react';

/** @type {import("eslint").Linter.Config[]} */
export default [
  // The generated registry JSON is not linted. Public static scripts (e.g.
  // theme-boot.js) declare their browser globals inline so they lint cleanly
  // under both this config and the monorepo-root config used by lint-staged.
  { ignores: ['dist/**', 'public/r/**'] },
  ...reactConfig,
];
