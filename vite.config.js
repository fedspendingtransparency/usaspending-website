// / <reference types="@vitest/browser-playwright" />
import path, { extname } from 'path';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv, createLogger } from 'vite';
import { fileURLToPath } from 'url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import autoprefixer from 'autoprefixer';
import mdx from "@mdx-js/rollup";
import babel from 'vite-plugin-babel';
import { configDefaults } from 'vitest/config';
import {ViteEjsPlugin} from "vite-plugin-ejs";
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
// Get the default Vite logger instance
const logger = createLogger();
const originalWarn = logger.warn;


// Override the warn method to filter out targeted messages
logger.warn = (msg, options) => {
  // Suppress generic vite:css warnings or specific sub-messages
  if (msg.includes('vite:css') || msg.includes('EVAL') || msg.includes('global-builtin') || msg.includes('color-functions') || msg.includes('slash-div')) {
    // Optional: Only suppress a specific pattern (e.g., 'is empty')
    // if (msg.includes('is empty')) return; 
    return; 
  }
  originalWarn(msg, options);
};
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ command, mode }) => {
  // Load environment variables based on the current mode (e.g., .env.production)
  const env = loadEnv(mode, process.cwd(), '')
  console.info("CURRENT ENV: ", env.VITE_USASPENDING_API);
  // Shared options used in both development and production
  const sharedConfig = {
    base: "./",
    loglevel: "error",
    emptyOutDir: true,
    customLogger: logger,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // Eliminates the legacy JS API warning
          quietDeps: true,         // Silences warnings coming from node_modules (e.g., Bootstrap, Vuetify)
        },
      },
      postcss: {
        plugins: [
          autoprefixer,
        ],
      }
    },
    define: {
      'import.meta.env.ENV': env?.ENV ? JSON.stringify(env?.ENV) : JSON.stringify('qat'),
      'import.meta.env.FILES_SERVER_BASE_URL': JSON.stringify(env?.FILES_SERVER_BASE_URL || '')
    },
    plugins: [
      svgr(),
      ViteEjsPlugin(),
      nodePolyfills({
        include: ['buffer', 'process', 'util'],
        globals: {
          Buffer: true,
          process: true,
          global: true,
        }
      }),
      react({
        // Tell the React plugin to handle JSX inside regular .js files
        include: /\.(jsx|tsx|js)$/,
      }),
      mdx(),
      createHtmlPlugin({
        template: path.resolve(__dirname, "index.html"),
        chunksSortMode: "",
        inject: {
          GA_TRACKING_ID: import.meta.env?.GA_TRACKING_ID || '',
          USE_GTM: (
            import.meta.env?.ENV === 'qat' ||
            import.meta.env?.ENV === 'sandbox'
          ),
          GTM_ID: import.meta.env?.GTM_ID || '',
          IS_PROD: (
            import.meta.env?.ENV === 'prod'
      )}}),
      viteStaticCopy({
        targets: [
        {
          src: '**/*.xml',
          dest: path.resolve(__dirname, "./dist"),
          suppressError: true
        },
        {
          src: 'robots.txt',
          dest: path.resolve(__dirname, "./dist"),
          suppressError: true
        },
        {
          src: 'redirect-config.json',
          dest: path.resolve(__dirname, "./dist"),
          suppressError: true
        }],
        silent: true})
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
        "models": path.resolve(__dirname, "./src/js/models"),
        "img": path.resolve(__dirname, "./src/img"),
        lodash: 'lodash-es',
      },
      modules: ["node_modules", path.resolve(__dirname, "../src/_scss")],
      fallback: { querystring: import.meta.resolve("querystring-es3") },
    },
    build: {
        assetsInlineLimit: 0,
        commonjsOptions: { transformMixedEsModules: true },
        rolldownOptions: {
            input: {
              main: path.resolve(__dirname, "index.html")
            },
            external: [/^moment\/locale\//,'react', 'react-dom', 'lodash-es', 'accounting', 'prop-types'],
            usedExports: true,
        }
    },
    test: {
      dir: './tests',
      globals: true, // Enables Jest-like global APIs (describe, test, expect)
      environment: 'jsdom', // Simulates browser DOM for UI tests
      setupFiles: ['./tests/setup.js'], // Runs before each test file
      exclude: [...configDefaults.exclude], // Ignores specific folders
      include: ['**/*-{test,spec}.?(c|m)[jt]s?(x)'],
      coverage: {
        provider: 'v8', // Code coverage tool
        reporter: ['text', 'json', 'html'],
      },
    },
  }

  if (mode === 'development') {
      return {
    ...sharedConfig,
    build: {
      emptyOutDir: true,
      assetsInlineLimit: 0,
      publicDir: path.resolve(__dirname, "./public"),
      sourcemap: true,
      emptyOutDir: true,
      minify: false,
      cssCodeSplit: true,
      rolldownOptions: { 
        input: path.resolve(__dirname, "index.html"),
        external: ['react', 'react-dom', 'lodash-es', 'accounting', 'prop-types'],
        output: {
          codeSplitting: true
        }
      },
    },
    logLevel: 'info',
    define: {
        'import.meta.env': {
            VITE_USASPENDING_API: env?.VITE_USASPENDING_API
              ? JSON.stringify(env?.VITE_USASPENDING_API)
              : JSON.stringify("https://api.usaspending.gov/api/"),
            MAPBOX_TOKEN: env?.MAPBOX_TOKEN
              ? JSON.stringify(env?.MAPBOX_TOKEN)
              : JSON.stringify("")
        }
      },
    server: {
      hmr: {
        overlay: false
      },
      port: 3000,
      open: true,
      fs: {
        allow: [".."]
      },
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_USASPENDING_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
  }
  // Production-specific configurations (command === 'build')
  // production build
  return {
    ...sharedConfig,
    build: {
      publicDir: path.resolve(__dirname, "./public"),
      sourcemap: true,
      emptyOutDir: true,
      minify: true,
      cssCodeSplit: true,
      rolldownOptions: { 
        external: ['react', 'react-dom', 'lodash-es', 'accounting', 'prop-types']
      },
    },
    logLevel: 'info',
      define: {
        'import.meta.env': {
            VITE_USASPENDING_API: env?.VITE_USASPENDING_API
              ? JSON.stringify(env?.VITE_USASPENDING_API)
              : JSON.stringify("https://api.usaspending.gov/api/"),
            MAPBOX_TOKEN: env?.MAPBOX_TOKEN
              ? JSON.stringify(env?.MAPBOX_TOKEN)
              : JSON.stringify("")
        },
        MAPBOX_TOKEN: env.MAPBOX_TOKEN,
        VITE_USASPENDING_API: env.VITE_USASPENDING_API
      },
    server: {
      port: 3000,
      open: true,
      fs: {
        allow: [".."]
      },
      cors: true,
      proxy: {
        '/api': {
          target: "https://api.usaspending.gov/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
});