import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  pluginReact.configs.flat.recommended,
]);
