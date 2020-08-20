/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import perflogger from 'redux-perf-middleware';
import kGlobalConstants from 'GlobalConstants';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import storeSingleton from 'redux/storeSingleton';
import withGlossaryListener from 'containers/glossary/GlossaryListener';
import reducers from 'redux/reducers/index';

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

const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        if (window?.history?.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return null;
};

const AppContainer = () => (
    <Provider store={store}>
        <BrowserRouter>
            <>
                <ScrollToTop />
                <Switch>
                    {routes.map(({ path, component }) => (
                        <Route
                            exact
                            path={path}
                            component={(routerProps) => withGlossaryListener(component, routerProps)}
                            key={path} />
                    ))}
                </Switch>
            </>
        </BrowserRouter>
    </Provider>
);

export default AppContainer;
