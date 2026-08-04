import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";

export default defineConfig([
    globalIgnores([
        "**/webpack/",
        "**/storybook-static/",
        "**/docs/",
        "**/__mocks__",
        "**/.storybook/",
        "**/coverage/",
        "**/scripts/",
        "**/*.md"
    ]),
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js, reactHooks, react, jsxA11y, pluginImport },
        extends: [
            "js/recommended",
            react.configs.flat.recommended,
            reactHooks.configs.flat.recommended,
            jsxA11y.flatConfigs.recommended,
            pluginImport.flatConfigs.react
        ],
        languageOptions: { 
            globals: { ...globals.node, ...globals.browser, ...globals.jest },
            ecmaVersion: "latest", // Or "2024", "2025", etc.
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: { react: { version: "19" } },
        rules: {
            // disabling class method "this" requirement to avoid React conflicts
            "class-methods-use-this": [0],
            // allow await in for-await-in loops
            "no-await-in-loop": [0],
            // allow continue statements
            "no-continue": [0],
            // allow ++ and --
            "no-plusplus": [0],
            // allow some globals
            "no-restricted-globals": [0],
            // allow for loops
            "no-restricted-syntax": [2, "LabeledStatement", "WithStatement"],
            "no-underscore-dangle": [0, { "allowAfterThis": true }],
            "prefer-arrow-callback": ["error"],
            // for now, don't do destructuring
            "prefer-destructuring": [0],
            // TODO: The following js rules have been deprecated and should be replaced,
            //  all have been addressed in @stylistic/eslint-plugin
            "indent": [2, 4, { "SwitchCase": 1 }],
            "max-len": [1, 100, { "tabWidth": 4 }],
            "comma-dangle": [2, "never"],
            "no-extra-semi": [1],
            "arrow-parens": [2, "always"],
            "quotes": [0],
            "brace-style": [1, "stroustrup"],
            "spaced-comment": [2, "always", { "exceptions": ["*"] }],
            "function-paren-newline": [0],

            "react/default-props-match-prop-types": [0],
            // allow object prop-type
            "react/forbid-prop-types": [1, { "forbid": ["any"] }],
            // closing brackets should be aligned with the final prop (props.. />)
            "react/jsx-closing-bracket-location": [2, {"location": "after-props"}],
            // require 4 spaces in JSX as well
            "react/jsx-indent": [0],
            "react/jsx-indent-props": [0],
            // downgrade array index as React key to warning (though it should be higher,
            // this would be an expensive refactor)
            "react/no-array-index-key": [1],
            // allow binding in React props because we don't have autobind in ES6
            "react/jsx-no-bind": [0],
            // downgrading to warning when using props purely within componentWillReceiveProps
            "react/no-unused-prop-types": [1],
            // allow unused state because linter does not always know
            // when a state is passed to child components
            "react/no-unused-state": [0],
            // disallow stateless functions in place of fully declared React components
            "react/prefer-stateless-function": [0],
            "react/prop-types": [1],
            // default prop types not required
            "react/require-default-props": [0],

            "react-hooks/exhaustive-deps": "warn",

            "jsx-a11y/anchor-is-valid": "warn",
            // downgrade label has for to a warning due to some design considerations
            "jsx-a11y/label-has-associated-control": [1],

            // allow named exports in files with default exports in order to expose containers
            // for testing
            "import/no-named-as-default": [0],
            // downgrading export default preference to warning,
            // since we may add additional exports to files in the future
            "import/prefer-default-export": ["warn"],

            // TODO: Fix errors and remove rules exceptions below
            //  They were added to avoid new errors with eslint upgrade
            "no-unsafe-optional-chaining": "warn",
            "no-unused-vars": "warn",
            "no-constant-binary-expression": "warn",
            "preserve-caught-error": "warn",
            "react/jsx-key": "warn",
            "react/jsx-no-target-blank": "warn",
            "react/no-unknown-property": "warn",
            "react/no-direct-mutation-state": "warn",
            "react/display-name": "warn",
            "react/no-unescaped-entities": "warn",
            "react-hooks/immutability": "warn",
            "react-hooks/purity": "warn",
            "react-hooks/refs": "warn",
            "react-hooks/set-state-in-effect": "warn",
            "react-hooks/globals": "warn",
            "react-hooks/static-components": "warn"
        }
    }
]);

// following rules noted as having eslint-disable lines
// "no-nested-ternary": "error",
// "camelcase": ["error", { properties: "never" }],
// "consistent-return": "error",
// "no-unused-expressions": "error",
// "no-param-reassign": "error",
// "one-var": "error",
// "no-shadow": "error",
// "no-return-assign": "error",
// "array-callback-return": "error",
// "prefer-const": "error",
// "react/no-danger": "error",
// "eqeqeq": "error",
// "arrow-body-style": "error",
// "no-confusing-arrow": "error", // deprecated (in @stylistic/eslint-plugin)
