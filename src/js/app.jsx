import React from 'react';
import { render } from 'react-dom';
import { hot } from "react-hot-loader";
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
    faAngleRight,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import AppContainer from 'containers/AppContainer';

/**
 * babel 7 removed the ECMAScript proposals from babel-polyfill.
 * See link here for this implementation: https://babeljs.io/docs/en/v7-migration
 * Also using the transform-runtime plugin for the test env.
*/
require("core-js");
require('helpers/rafPolyfill');

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
    faAngleRight,
    faInfoCircle
);

const appDiv = document.getElementById('app');
const App = render(
    <AppContainer />,
    appDiv
);

export default hot(module)(App);
