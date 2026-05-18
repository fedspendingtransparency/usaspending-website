import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

import react from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';

export default defineConfig([
    globalIgnores([
        "**/webpack/",
        "**/storybook-static/",
        "**/docs/",
        "**/__mocks__",
        "**/.storybook/",
        "**/coverage/",
        "**/scripts/",
        "**/tests/" // TODO: don't forget to remove this line
    ]),
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
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
            "function-paren-newline": [0] // TODO: deprecated
        }
    },
    {
        ...react.configs.flat.recommended,
        rules: {
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
            "react/require-default-props": [0]
        }
    },
    {
        ...jsxA11y.flatConfigs.recommended,
        rules: {
            "jsx-a11y/anchor-is-valid": "warn",
            // downgrade label has for to a warning due to some design considerations
            "jsx-a11y/label-has-for": [1]
        }
    },
    {
        ...reactHooks.configs.flat.recommended,
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": [1]
        }
    },
    {
        ...pluginImport.flatConfigs.recommended,
        rules: {
            // allow named exports in files with default exports in order to expose containers
            // for testing
            "import/no-named-as-default": [0],
            // downgrading export default preference to warning,
            // since we may add additional exports to files in the future
            "import/prefer-default-export": [1]
        }
    }
]);
