import React from 'react';
import Perf from 'react-addons-perf';
import { render } from 'react-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChartPie,
    faChartArea,
    faLandmark,
    faMapMarkerAlt,
    faCalendarAlt,
    faLevelUpAlt,
    faPencilAlt,
    faTag,
    faUserTie,
    faChartBar,
    faEllipsisH,
    faAngleDown,
    faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import kGlobalConstants from 'GlobalConstants';
import AppContainer from 'containers/AppContainer';

library.add(
    faChartArea,
    faChartPie,
    faLandmark,
    faLevelUpAlt,
    faMapMarkerAlt,
    faCalendarAlt,
    faPencilAlt,
    faUserTie,
    faTag,
    faChartBar,
    faEllipsisH,
    faAngleDown,
    faAngleRight
);
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
