/**
* RouterContainer.jsx
* Created by Emily Gullo 10/14/2016
**/

import React from 'react';
import ReactDOM from 'react-dom';
import { kGlobalConstants } from '../../GlobalConstants.js';
import { Router, Route, Link, hashHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../redux/actions/sessionActions.js';

import RouterRoutes from './RouterRoutes.jsx';

const ga = require('react-ga');
const GA_OPTIONS = { debug: false };

const Routes = new RouterRoutes();

let sessionChecker;

class RouterContainer extends React.Component {
    componentDidMount() {
        ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
    }

    handleRouteChange() {
        let path = this.refs.router.state.location.pathname;
        this.logPageView(path);
    }

    logPageView(path) {
        ga.pageview(path);
    }


    render() {
        return (
            <Router routes={Routes.routes()} history={hashHistory} onUpdate={this.handleRouteChange.bind(this)} ref="router" />
        );

    }
}


export default connect(
    state => ({
        session: state.session
    }),
    dispatch => bindActionCreators(sessionActions, dispatch)
)(RouterContainer)