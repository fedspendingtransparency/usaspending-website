// / <reference types="@vitest/browser-playwright" />
import path from 'path';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import htmlPurge from 'vite-plugin-purgecss';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig({
    build: {
        commonjsOptions: { transformMixedEsModules: true },
        outDir: path.resolve(__dirname, "./docs"),
        rolldownOptions: {
            input: "index.js",
            external: ['react', 'react-dom', 'lodash-es', 'accounting', 'prop-types']
        }
    },
    optimizeDeps: {
        rolldownOptions: {
            resolve: {
                extensions: ['.js', '.jsx']
            },
            plugins: [react(), babel({ presets: [reactCompilerPreset()] }), htmlPurge(), nodePolyfills()]
        }
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), htmlPurge(), nodePolyfills()],
    test: {
        projects: [{
            extends: true,
            plugins: [
                // The plugin will run tests for the stories defined in your Storybook config
                // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                storybookTest({
                    configDir: path.join(__dirname, '.storybook')
                })],
            test: {
                name: 'storybook',
                browser: {
                    enabled: true,
                    headless: true,
                    provider: playwright({}),
                    instances: [{
                        browser: 'chromium'
                    }]
                },
                setupFiles: ['.storybook/vitest.setup.ts']
            }
        }]
    }
});
