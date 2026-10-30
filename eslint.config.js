const globals = Object.fromEntries(
  [
    'Buffer',
    '__dirname',
    '__filename',
    'clearTimeout',
    'console',
    'exports',
    'global',
    'module',
    'process',
    'require',
    'setImmediate',
    'setTimeout',
  ].map((name) => [name, 'readonly']),
);

module.exports = [
  {
    ignores: ['coverage/**', 'node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals,
    },
    rules: {
      curly: 'error',
      eqeqeq: 'error',
      'no-constant-condition': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': [
        'error',
        { args: 'all', argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },
];
