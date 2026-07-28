import js from '@eslint/js';
import globals from 'globals';
import { flatConfigs as importX } from 'eslint-plugin-import-x';
import vitest from '@vitest/eslint-plugin';

/*
 * Flat config, replacing the .eslintrc that extended airbnb-base.
 *
 * airbnb-base was dropped rather than upgraded: its last release (15.0.0, 2021)
 * caps at ESLint 8 and has no flat-config support, and the flat-config successor
 * eslint-config-airbnb-extended caps at ESLint 9. The style rules airbnb used to
 * provide are listed explicitly below.
 *
 * babel-eslint is gone too. It existed to parse syntax espree could not handle;
 * espree now parses everything this codebase uses natively.
 */
export default [
  {
    ignores: ['lib/**']
  },

  js.configs.recommended,
  importX.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'no-underscore-dangle': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'object-shorthand': 'error',
      eqeqeq: ['error', 'always'],
      'no-else-return': 'error',
      // Kept from airbnb-base: the source carries eslint-disable comments for
      // deliberate exceptions to both, which would silently become dead
      // without the rules enabled.
      camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
      'no-nested-ternary': 'error',
      // Matches airbnb's setting, so `const { a, ...rest } = obj` does not
      // report `a` as unused.
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }]
    }
  },

  {
    ...vitest.configs.recommended,
    files: ['tests/**/*.js']
  }
];
