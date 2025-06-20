const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jest = require('eslint-plugin-jest');
const testingLibrary = require('eslint-plugin-testing-library');
const jestDom = require('eslint-plugin-jest-dom');
const prettier = require('eslint-plugin-prettier');
const storybook = require('eslint-plugin-storybook');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  // ESLint recommended
  js.configs.recommended,

  // Prettier config (disables conflicting rules)
  prettierConfig,

  // Configuration files (eslint.config.js, etc.) - allow require imports
  {
    files: ['eslint.config.js', '*.config.js', '*.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Main configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['eslint.config.js', '*.config.js', '*.config.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 6,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
          arrowFunctions: true,
          restParams: true,
          experimentalObjectRestSpread: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.es2015,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      jest: jest,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
      prettier: prettier,
    },
    rules: {
      // TypeScript ESLint recommended rules
      ...typescript.configs.recommended.rules,

      // React recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // React Hooks recommended
      ...reactHooks.configs.recommended.rules,

      // Jest recommended + style
      ...jest.configs.recommended.rules,
      ...jest.configs.style.rules,

      // Testing Library React
      ...testingLibrary.configs.react.rules,

      // Jest DOM recommended
      ...jestDom.configs.recommended.rules,

      // Original custom overrides
      'prettier/prettier': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Storybook rules for story files only
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}', '**/.storybook/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      storybook: storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
];
