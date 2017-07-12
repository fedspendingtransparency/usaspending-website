import React from 'react';
import Perf from 'react-addons-perf';
import { render } from 'react-dom';
import kGlobalConstants from 'GlobalConstants';
import AppContainer from 'containers/AppContainer';

require('babel-polyfill');
require('helpers/rafPolyfill');

const appDiv = document.getElementById('app');
render(
    <AppContainer />,
    appDiv
);

if (kGlobalConstants.PERF_LOG) {
    // enable console React performance testing when PERF_LOG is enabled
    window.Perf = Perf;
}
