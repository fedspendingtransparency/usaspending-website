/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import kGlobalConstants from 'GlobalConstants';

import reducers from 'redux/reducers/index';
import HomePage from 'components/HomePage';

import RouterContainer from './router/RouterContainer';
// import Router from './router2/Router';

let devExtension;
if (kGlobalConstants.DEV) {
    // only enable Redux debugging in dev mode
    devExtension = window.devToolsExtension ? window.devToolsExtension() : undefined;
}

const store = createStore(reducers, {}, devExtension);
export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        // may be unnecessary without a login, re-work in future
        this.state = {
            appReady: true,
            showPending: false
        };
    }

    render() {
        let appContents = <HomePage />;
        if (this.state.appReady || !this.state.showPending) {
            appContents = <RouterContainer store={store} />;
            // appContents = <Router store={store} />;
        }

        return (
            <Provider store={store}>
                {appContents}
            </Provider>
        );
    }
}
