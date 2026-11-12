import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const root = path.dirname(fileURLToPath(import.meta.url));

// webpack `resolve.modules`: bare imports like 'components/x' or '_global.scss' fall back to these.
const LOCAL_ROOTS = [path.resolve(root, 'src/js'), path.resolve(root, 'src/_scss')];

// Mirrors webpack's resolve.modules: node_modules wins, then src/js, then src/_scss.
const localRootsResolver = () => ({
    name: 'local-roots-resolver',
    enforce: 'pre',
    async resolveId(source, importer, options) {
        if (!importer || options?.isEntry) return null;
        if (/^(\.|\/|\0|[a-zA-Z]:|https?:|data:)/.test(source) || source.startsWith('virtual:')) return null;

        // Let normal resolution (node_modules, aliases) win first.
        const normal = await this.resolve(source, importer, { ...options, skipSelf: true });
        if (normal) return normal;

        for (const dir of LOCAL_ROOTS) {
            const resolved = await this.resolve(path.join(dir, source), importer, { ...options, skipSelf: true });
            if (resolved) return resolved;
        }
        return null;
    }
});

// Environment config migrated from webpack.common.js / webpack.{local,dev,prod}.config.js.
// loadEnv('') loads every variable (no VITE_ prefix required) from .env files AND the shell,
// so existing CI/CD environment variables keep working unchanged.
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        // Replaces the webpack DefinePlugin blocks. Source code (GlobalConstants.js) still reads
        // process.env.*, so it works under both webpack and vite during the migration.
        define: {
            'process.env.ENV': JSON.stringify(env.ENV || 'qat'),
            'process.env.USASPENDING_API': JSON.stringify(env.USASPENDING_API || 'https://api.usaspending.gov/api/'),
            'process.env.MAPBOX_TOKEN': JSON.stringify(env.MAPBOX_TOKEN || ''),
            'process.env.X_LLM_API_KEY': JSON.stringify(env.X_LLM_API_KEY || ''),
            'process.env.FILES_SERVER_BASE_URL': JSON.stringify(env.FILES_SERVER_BASE_URL || '')
        },
        // Static files are copied by viteStaticCopy below; ./public is webpack's output dir.
        publicDir: false,
        resolve: {
            alias: {
                lodash: 'lodash-es',
                querystring: 'querystring-es3'
            },
            extensions: ['.js', '.jsx', '.json', '.mdx', '.md']
        },
        plugins: [
            localRootsResolver(),
            // MDX must run before the React plugin.
            { enforce: 'pre', ...mdx() },
            react(),
            // Replaces HtmlWebpackPlugin templateParameters. index.html keeps the EJS
            // <% %> / <%= %> syntax from src/index.ejs.
            createHtmlPlugin({
                minify: false,
                inject: {
                    data: {
                        GA_TRACKING_ID: env.GA_TRACKING_ID || '',
                        USE_GTM: env.ENV === 'qat' || env.ENV === 'sandbox',
                        GTM_ID: env.GTM_ID || '',
                        IS_PROD: env.ENV === 'prod'
                    }
                }
            }),
            // Replaces CopyWebpackPlugin.
            viteStaticCopy({
                targets: [
                    { src: 'src/img/**/*', dest: 'img', rename: { stripBase: 2 } },
                    { src: 'src/graphics/**/*', dest: 'graphics', rename: { stripBase: 2 } },
                    { src: 'src/fonts/**/*', dest: 'fonts', rename: { stripBase: 2 } },
                    { src: 'src/data/**/*', dest: 'data', rename: { stripBase: 2 } },
                    { src: '*.xml', dest: '' },
                    { src: 'robots.txt', dest: '' },
                    { src: 'redirect-config.json', dest: '' }
                ],
                silent: true
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    // webpack: sassOptions.includePaths
                    loadPaths: [path.resolve(root, 'src/_scss'), path.resolve(root, 'node_modules')]
                }
            }
        },
        build: {
            // webpack builds into ./public; keep vite output separate until webpack is removed
            outDir: 'dist',
            sourcemap: mode !== 'production'
        },
        server: {
            host: '0.0.0.0', // allows VMs to access the server
            port: 3000,
            allowedHosts: true
        }
    };
});
