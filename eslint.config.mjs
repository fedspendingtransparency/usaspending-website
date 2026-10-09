import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    globalIgnores([
        '**/webpack/',
        '**/storybook-static/',
        '**/docs/',
        '**/__mocks__',
        '**/.storybook/',
        '**/coverage/',
        '**/scripts/',
        '**/*.md'
    ]),
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js, reactHooks, react, jsxA11y, pluginImport, stylistic },
        extends: [
            'js/recommended',
            react.configs.flat.recommended,
            reactHooks.configs.flat.recommended,
            jsxA11y.flatConfigs.recommended,
            pluginImport.flatConfigs.react,
            stylistic.configs.recommended
        ],
        languageOptions: {
            globals: { ...globals.node, ...globals.browser, ...globals.jest },
            ecmaVersion: 'latest', // Or "2024", "2025", etc.
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: { react: { version: '19' } },
        rules: {
            'no-restricted-syntax': [2, 'LabeledStatement', 'WithStatement'],

            '@stylistic/arrow-parens': ['error', 'always'],
            '@stylistic/brace-style': ['error', 'stroustrup'],
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/indent': [2, 4, { SwitchCase: 1 }],
            '@stylistic/indent-binary-ops': [2, 4],
            '@stylistic/jsx-closing-bracket-location': ['error', 'after-props'],
            '@stylistic/jsx-indent-props': [2, 4],
            '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
            '@stylistic/operator-linebreak': ['error', 'after'],
            '@stylistic/quotes': [1],
            '@stylistic/semi': ['error', 'always'],

            'react/forbid-prop-types': [1, { forbid: ['any'] }],
            'react/jsx-closing-bracket-location': [2, { location: 'after-props' }],
            'react/no-array-index-key': [1],
            'react/no-unused-prop-types': [1],
            'react/prop-types': [1],

            'react-hooks/exhaustive-deps': 'warn',
            'react-hooks/set-state-in-effect': 'warn', // TODO: fix these findings and set to error

            'import/prefer-default-export': ['warn']
        }
    }
]);
