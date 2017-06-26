/**
* RouterContainer.jsx
* Created by Kevin Li 5/26/17
**/

import React from 'react';
import kGlobalConstants from 'GlobalConstants';

import GlossaryListenerSingleton from './GlossaryListenerSingleton';
import Router from './Router';

const ga = require('react-ga');

const GA_OPTIONS = { debug: false };


export default class RouterContainer extends React.Component {
    static logPageView(path) {
        ga.pageview(path);
    }

    constructor(props) {
        super(props);

        this.state = {
            lastPath: '',
            lastParent: '',
            content: null,
            route: {
                params: {}
            },
            showSpinner: false
        };

        // bind functions
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    componentWillMount() {
        // subscribe to the Router for changes
        Router.reactContainer = this;
        Router.startRouter();
    }

    componentDidMount() {
        // don't initialize Google Analytics if no tracking ID is provided
        if (kGlobalConstants.GA_TRACKING_ID !== '') {
            ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
        }
    }

    componentWillUnmount() {
        Router.reactContainer = null;
    }

    handleRouteChange() {
        const path = Router.state.path;
        const parent = Router.state.parent;


        if (this.state.lastPath !== path) {
            // log with Google Analytics
            RouterContainer.logPageView(path);
            ga.pageview(window.location.hash);

            if (this.state.lastParent !== parent || !Router.state.silentlyUpdate) {
                // scroll to top of page, but only if the parent has changed (ignore in-page URL changes)
                // and silent updates are not enabled
                // this prevents the page from returning to the top when the search page hash changes
                window.scrollTo(0, 0);
            }

            this.setState({
                lastPath: path,
                lastParent: parent
            });
        }

        GlossaryListenerSingleton.updateGlossaryValue(Router.state.query);
    }

    navigateToComponent(component, route) {
        this.setState({
            route,
            content: component,
            showSpinner: false
        }, () => {
            // route changed, trigger callback
            this.handleRouteChange();
        });
    }

    showSpinner() {
        this.setState({
            showSpinner: true
        });
    }

    render() {
        if (!this.state.content) {
            return null;
        }

        // TODO: Kevin Li - implement loading spinner for long-load modules
        const loadingSpinner = null;

        const ContentComponent = this.state.content;
        return (
            <div>
                <ContentComponent params={this.state.route.params} />
                { loadingSpinner }
            </div>
        );
    }
}
