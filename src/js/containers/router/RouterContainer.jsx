/**
* RouterContainer.jsx
* Created by Emily Gullo 10/14/2016
**/

import React from 'react';
import { Router, hashHistory } from 'react-router';

import kGlobalConstants from '../../GlobalConstants';

import RouterRoutes from './RouterRoutes';

const ga = require('react-ga');

const GA_OPTIONS = { debug: false };

const Routes = new RouterRoutes();

export default class RouterContainer extends React.Component {
    static logPageView(path) {
        ga.pageview(path);
    }

    componentDidMount() {
        ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
    }

    handleRouteChange() {
        const path = this.router.state.location.pathname;
        RouterContainer.logPageView(path);
    }

    render() {
        return (
            <Router
                routes={Routes.routes()}
                history={hashHistory}
                onUpdate={this.handleRouteChange.bind(this)}
                ref={(router) => {
                    this.router = router;
                    return this.router;
                }} />
        );
    }
}
