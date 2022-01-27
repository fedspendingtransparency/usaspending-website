/**
 * index.js
 * Created by Kevin Li 6/20/17
 * This is the main entry point for Webpack, which will follow a series of imports and requires
 * to determine which assets are used by the app.
 * ./src/index.js is the default entry point for webpack (https://webpack.js.org/concepts/)
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './js/app';

// require all the static files
require.context('./fonts', true);
require.context('./graphics', true);
require.context('./img', true);
require.context('./data', true);

// require the CSS
require('./css/main.scss');

