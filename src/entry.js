/**
 * entry.js
 * Created by Kevin Li 6/20/17
 * This is the main entry point for Webpack, which will follow a series of imports and requires
 * to determine which assets are used by the app.
 */

// require all the static files
require.context('./fonts', true);
require.context('./graphics', true);
require.context('./img', true);

// require the CSS
require('./css/main.scss');

// require the main JS file
require('./js/app.jsx');
