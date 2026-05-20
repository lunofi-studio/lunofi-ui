import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { config as baseConfig } from './base.js';

/** @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  reactHooksPlugin.configs.flat['recommended-latest'],
  {
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
];
