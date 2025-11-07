import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import babel from "eslint-plugin-babel";
import { fixupPluginRules } from "@eslint/compat";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/*.md"]), {
    extends: compat.extends("airbnb"),

    plugins: {
        "react-hooks": fixupPluginRules(reactHooks),
        babel,
    },

    languageOptions: {
        globals: {
            window: true,
            document: true,
        },

        parser: babelParser,
        ecmaVersion: 2022,
        sourceType: "script",

        parserOptions: {
            presets: ["@babel/preset-react"],
        },
    },

    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: ["node_modules", "src/js", "src/_scss"],
            },
        },
    },

    rules: {
        indent: [2, 4, {
            SwitchCase: 1,
        }],

        "react/jsx-indent": [0],
        "react/jsx-indent-props": [0],

        "react/jsx-closing-bracket-location": [2, {
            location: "after-props",
        }],

        "react/prop-types": [1],
        "react/no-unused-prop-types": [1],

        "max-len": [1, 100, {
            tabWidth: 4,
        }],

        "comma-dangle": [2, "never"],
        "no-extra-semi": [1],
        "arrow-parens": [2, "always"],
        quotes: [0],
        "no-restricted-syntax": [2, "LabeledStatement", "WithStatement"],
        "brace-style": [1, "stroustrup"],
        "react/prefer-stateless-function": [0],
        "react/jsx-no-bind": [0],
        "import/prefer-default-export": [1],
        "class-methods-use-this": [0],

        "no-underscore-dangle": [0, {
            allowAfterThis: true,
        }],

        "no-plusplus": [0],
        "no-continue": [0],
        "import/no-named-as-default": [0],
        "function-paren-newline": [0],

        "spaced-comment": [2, "always", {
            exceptions: ["*"],
        }],

        "prefer-destructuring": [0],
        "no-restricted-globals": [0],
        "react/require-default-props": [0],
        "react/default-props-match-prop-types": [0],

        "react/forbid-prop-types": [1, {
            forbid: ["any"],
        }],

        "react/no-unused-state": [0],
        "jsx-a11y/label-has-for": [1],
        "react/no-array-index-key": [1],
        "no-await-in-loop": [0],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [1],
        "jsx-a11y/anchor-is-valid": "warn",
    },
}]);