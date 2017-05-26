/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import perflogger from 'redux-perf-middleware';
import kGlobalConstants from 'GlobalConstants';

import StoreSingleton from 'redux/storeSingleton';

import reducers from 'redux/reducers/index';
// import Homepage from 'components/homepage/Homepage';

import RouterContainer from './router/RouterContainer';

let devExtension;
let store;
if (kGlobalConstants.DEV) {
    // only enable Redux debugging in dev mode
    devExtension = window.devToolsExtension ? window.devToolsExtension() : undefined;
}

if (kGlobalConstants.PERF_LOG) {
    // enable performance logging
    const createStoreWithMiddleware = applyMiddleware(perflogger)(createStore);
    store = createStoreWithMiddleware(reducers, devExtension);
}
else {
    store = createStore(reducers, {}, devExtension);
}

// hold a reference to the store from the store singleton
const storeSingleton = new StoreSingleton();
storeSingleton.setStore(store);

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
        // let appContents = <Homepage />;
        let appContents = <RouterContainer store={store} />;
        // if (this.state.appReady || !this.state.showPending) {
        //     appContents = <RouterContainer store={store} />;
        // }

        return (
            <Provider store={store}>
                {appContents}
            </Provider>
        );
    }
}
