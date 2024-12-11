import React from 'react';
import { createRoot } from "react-dom/client";

import AppContainer from 'containers/AppContainer';
import registerIcons from './registerIcons';

/**
 * babel 7 removed the ECMAScript proposals from babel-polyfill.
 * See link here for this implementation: https://babeljs.io/docs/en/v7-migration
 * Also using the transform-runtime plugin for the test env.
*/
require("core-js");
require('helpers/rafPolyfill');

registerIcons();

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
console.debug("farts");
const App = root.render(
    <AppContainer />
);
export default App;
