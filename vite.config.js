// / <reference types="@vitest/browser-playwright" />
import { path, resolve } from 'path';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import htmlPurge from 'vite-plugin-purgecss';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig(({ command, mode }) => {
  // Load environment variables based on the current mode (e.g., .env.production)
  const env = loadEnv(mode, process.cwd(), '')

  // Shared options used in both development and production
  const sharedConfig = {
    plugins: [react()],
    server: {
      watch: {
        usePolling: true
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        lodash: 'lodash-es',
      },
      modules: ["node_modules", path.resolve(__dirname, "../src/_scss")],
      fallback: { querystring: import.meta.resolve("querystring-es3") },
    },
    build: {
        commonjsOptions: { transformMixedEsModules: true },
        outDir: path.resolve(__dirname, "../public"),
        rollupOptions: {
            output: {
                entryFileNames: "[name].[contenthash].js", 
            },
            splitChunks: { chunks: 'all' },
            usedExports: true
        },
        rolldownOptions: {
            input: "./src/index.js",
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
  }

  // Development-specific configurations
  if (command === 'serve') {
    return {
      ...sharedConfig,
      server: {
        port: 3000,
        open: true,
        proxy: {
          '/api': {
            target: env.VITE_DEV_API_URL || 'http://localhost:8080',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  }

  // Production-specific configurations (command === 'build')
  return {
    ...sharedConfig,
    base: '/production-sub-path/', 
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      cssCodeSplit: true,
      rolldownOptions: { 
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  }
});

/*



*/