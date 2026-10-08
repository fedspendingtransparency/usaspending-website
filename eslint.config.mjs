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
            // downgrading to warning when using props purely within componentWillReceiveProps
            'react/no-unused-prop-types': [1],
            'react/prop-types': [1],

            'react-hooks/exhaustive-deps': 'warn',

            'jsx-a11y/anchor-is-valid': 'warn',
            // downgrade label has for to a warning due to some design considerations
            'jsx-a11y/label-has-associated-control': [1],

            // allow named exports in files with default exports in order to expose containers
            // for testing
            'import/no-named-as-default': [0],
            // downgrading export default preference to warning,
            // since we may add additional exports to files in the future
            'import/prefer-default-export': ['warn'],

            // TODO: Fix errors and remove rules exceptions below
            //  They were added to avoid new errors with eslint upgrade
            'react-hooks/set-state-in-effect': 'warn'
        }
    }
]);

// eslint --config eslint.config.mjs --ext .jsx,.js "src/js/**" --quiet
// literal: 2391, single-child: 2032, single-line: 916, non-jsx: 1725
