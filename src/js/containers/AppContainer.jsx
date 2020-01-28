/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import perflogger from 'redux-perf-middleware';
import kGlobalConstants from 'GlobalConstants';

import storeSingleton from 'redux/storeSingleton';
import reducers from 'redux/reducers/index';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './router/RouterRoutes';

let devExtension;
let store;
if (kGlobalConstants.DEV) {
    // only enable Redux debugging in dev mode
    devExtension = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;
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
storeSingleton.setStore(store);

export default class AppContainer extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {routes.map(({ path, component }) => (
                            <Route exact path={path} component={component} key={path} />
                        ))}
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
