import React from 'react';
import { render } from 'react-dom';
import { hot } from "react-hot-loader";
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

const appDiv = document.getElementById('app');
const App = render(
    <AppContainer />,
    appDiv
);

export default hot(module)(App);
