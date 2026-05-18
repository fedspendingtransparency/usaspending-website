import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

import react from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

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
        languageOptions: { globals: globals.browser }
    },
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    reactHooks.configs.flat.recommended
]);
