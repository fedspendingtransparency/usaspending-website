import React from 'react';
import Perf from 'react-addons-perf';
import { render } from 'react-dom';
import { hot } from "react-hot-loader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartPie as fontAwesomeIcons } from "@fortawesome/free-solid-svg-icons";
import kGlobalConstants from 'GlobalConstants';
import AppContainer from 'containers/AppContainer';

library.add(fontAwesomeIcons);
/**
 * babel 7 removed the ECMAScript proposals from babel-polyfill.
 * See link here for this implementation: https://babeljs.io/docs/en/v7-migration
 * Also using the transform-runtime plugin for the test env.
*/
require("core-js");
require("regenerator-runtime/runtime");
require('helpers/rafPolyfill');

const appDiv = document.getElementById('app');
const App = render(
    <AppContainer />,
    appDiv
);

if (kGlobalConstants.PERF_LOG) {
    // enable console React performance testing when PERF_LOG is enabled
    window.Perf = Perf;
}

export default hot(module)(App);
