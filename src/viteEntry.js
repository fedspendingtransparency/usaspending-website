/**
 * viteEntry.js
 * Vite entry point. Replaces src/index.js, which relies on webpack-only require.context().
 * Static files (fonts, graphics, img, data) are copied by vite-plugin-static-copy in vite.config.js.
 */

import './css/main.scss';
import './js/app';
