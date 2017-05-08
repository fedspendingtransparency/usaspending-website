/**
* RouterContainer.jsx
* Created by Emily Gullo 10/14/2016
**/

import React from 'react';
import { Router, hashHistory } from 'react-router';

import kGlobalConstants from 'GlobalConstants';

import GuideListenerSingleton from './GuideListenerSingleton';
import RouterRoutes from './RouterRoutes';

const ga = require('react-ga');

const GA_OPTIONS = { debug: false };

const Routes = new RouterRoutes();

export default class RouterContainer extends React.Component {
    static logPageView(path) {
        ga.pageview(path);
    }

    constructor(props) {
        super(props);

        this.state = {
            lastPath: ''
        };

        // bind functions
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    componentDidMount() {
        // don't initialize Google Analytics if no tracking ID is provided
        if (kGlobalConstants.GA_TRACKING_ID !== '') {
            ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
        }
    }

    handleRouteChange() {
        const path = this.router.state.location.pathname;
        RouterContainer.logPageView(path);
        ga.pageview(window.location.hash);

        if (this.state.lastPath !== path) {
            // scroll to top of page, but only if the path has changed (ignore in-page URL changes)
            window.scrollTo(0, 0);

            this.setState({
                lastPath: path
            });
        }

        GuideListenerSingleton.updateGuideValue(this.router.state.location.query);
    }

    render() {
        return (
            <Router
                routes={Routes.routes()}
                history={hashHistory}
                onUpdate={this.handleRouteChange}
                ref={(router) => {
                    this.router = router;
                    return this.router;
                }} />
        );
    }
}
