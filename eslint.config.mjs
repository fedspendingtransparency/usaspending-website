import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

import pluginReact from "eslint-plugin-react";
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
    pluginReact.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended
]);
