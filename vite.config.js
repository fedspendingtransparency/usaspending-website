// / <reference types="@vitest/browser-playwright" />
import path, { extname } from 'path';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import htmlPurge from 'vite-plugin-purgecss';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import autoprefixer from 'autoprefixer';
import mdx from "@mdx-js/rollup";
import babel from 'vite-plugin-babel';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));



// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig(({ command, mode }) => {
  // Load environment variables based on the current mode (e.g., .env.production)
  const env = loadEnv(mode, process.cwd(), '')
  
  // Shared options used in both development and production
  const sharedConfig = {
    loglevel: "error",
    css: {
      postcss: {
        plugins: [
          autoprefixer,
        ],
      }
    },
    oxc: {
      logOverride: { 'css-syntax-error': 'silent' }, // Mute specific esbuild warnings
    },
    root: 'src',
    define: {
      'process.env.ENV': process.env.ENV ? JSON.stringify(process.env.ENV) : JSON.stringify('qat'),
      'process.env.FILES_SERVER_BASE_URL': JSON.stringify(process.env.FILES_SERVER_BASE_URL || '')
    },
    plugins: [
      react({
        // Tell the React plugin to handle JSX inside regular .js files
        include: /\.(jsx|tsx|js)$/,
      }),
      mdx(),
      createHtmlPlugin({
        template: path.resolve(__dirname, "./index.js"),
        chunksSortMode: "none",
        templateParameters: {
          GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
          USE_GTM: (
            process.env.ENV === 'qat' ||
            process.env.ENV === 'sandbox'
          ),
          GTM_ID: process.env.GTM_ID || '',
          IS_PROD: (
            process.env.ENV === 'prod'
      )}}),
      viteStaticCopy({
        targets: [
        {
          src: '*.xml',
          dest: path.resolve(__dirname, "../public"),
        },
        {
          src: '*.xml',
          dest: path.resolve(__dirname, "../public"),
        },
        {
          src: 'robots.txt',
          dest: path.resolve(__dirname, "../public"),
        },
        {
          src: 'redirect-config.json',
          dest: path.resolve(__dirname, "../public"),
        }]})
    ],
    server: {
      watch: {
        usePolling: true
      }
    },
    resolve: {
      tsconfigPaths: true,
      alias: {
        '@': path.resolve(__dirname, './src/_scss'),
        '~': path.resolve(__dirname, './node_modules'),
        'components': path.resolve(__dirname, './src/js/components'),
        'helpers': path.resolve(__dirname, './src/js/helpers'),
        'containers': path.resolve(__dirname, './src/js/containers'),
        'apis': path.resolve(__dirname, './src/js/apis'),
        'dataMapping': path.resolve(__dirname, './src/js/dataMapping'),
        '-redux': path.resolve(__dirname, './src/js/redux'),
        'context': path.resolve(__dirname, './src/js/context'),
        'GlobalConstants': path.resolve(__dirname, './src/js/GlobalConstants.js'),
        'propTypes' : path.resolve(__dirname, "./src/js/propTypes/index.js"),
        "hooks": path.resolve(__dirname, "./src/js/hooks"),
        "features": path.resolve(__dirname, "./src/js/features"),
        lodash: 'lodash-es',
      },
      modules: ["node_modules", path.resolve(__dirname, "../src/_scss")],
      fallback: { querystring: import.meta.resolve("querystring-es3") },
    },
    build: {
        commonjsOptions: { transformMixedEsModules: true },
        outDir: path.resolve(__dirname, "../public"),
        emptyOutDir: true,
        rollupOptions: {
            input: "./index.js",
            output: {
                entryFileNames: "[name].[contenthash].js", 
            },
            splitChunks: { chunks: 'all' },
            usedExports: true,
            external: [/^moment\/locale\//]
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
            loader: {
              '.js': 'jsx',
            },
            plugins: [react(), htmlPurge(), nodePolyfills(), mdx()]
        },
    },
    plugins: [react(), htmlPurge(), nodePolyfills(), mdx()],
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
      minify: false,
      cssCodeSplit: true,
      rolldownOptions: { 
        input: "index.js",
        external: ['react', 'react-dom', 'lodash-es', 'accounting', 'prop-types']
      },
    },
  }
});

/*



*/