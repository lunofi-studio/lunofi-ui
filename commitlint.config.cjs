module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'ui',
        'web',
        'docs',
        'registry',
        'cli',
        'tailwind',
        'theme',
        'blocks',
        'config',
        'deps',
        'repo',
      ],
    ],
    'scope-empty': [1, 'never'],
  },
};
