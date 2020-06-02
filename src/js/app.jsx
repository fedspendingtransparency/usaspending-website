import React from 'react';
import { render } from 'react-dom';
import { hot } from "react-hot-loader";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faAngleRight,
    faAngleLeft,
    faArrowCircleLeft,
    faBan,
    faBook,
    faBuilding,
    faCalendarAlt,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCaretUp,
    faChartArea,
    faChartBar,
    faChartPie,
    faCheckSquare,
    faCheckCircle,
    faChevronDown,
    faChevronUp,
    faChevronRight,
    faEllipsisH,
    faExternalLinkAlt,
    faHandsHelping,
    faInfo,
    faInfoCircle,
    faLandmark,
    faLevelUpAlt,
    faMapMarkerAlt,
    faMinusSquare,
    faPencilAlt,
    faSearch,
    faSitemap,
    faSpinner,
    faSquare,
    faTable,
    faTag,
    faThLarge,
    faTimes,
    faUserTie,
    faShareAlt,
    faEnvelope,
    faLink,
    faExclamationCircle,
    faDownload
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
    faAngleDown,
    faAngleRight,
    faAngleLeft,
    faArrowCircleLeft,
    faBan,
    faBook,
    faBuilding,
    faCalendarAlt,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCaretUp,
    faChartArea,
    faChartBar,
    faChartPie,
    faCheckSquare,
    faCheckCircle,
    faChevronDown,
    faChevronUp,
    faChevronRight,
    faEllipsisH,
    faExternalLinkAlt,
    faHandsHelping,
    faInfo,
    faInfoCircle,
    faLandmark,
    faLevelUpAlt,
    faMapMarkerAlt,
    faMinusSquare,
    faPencilAlt,
    faSearch,
    faSitemap,
    faSpinner,
    faSquare,
    faTable,
    faTag,
    faThLarge,
    faTimes,
    faUserTie,
    faShareAlt,
    faEnvelope,
    faLink,
    faExclamationCircle,
    faDownload
);

const appDiv = document.getElementById('app');
const App = render(
    <AppContainer />,
    appDiv
);

export default hot(module)(App);
