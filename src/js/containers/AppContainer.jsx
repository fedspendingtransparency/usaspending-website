/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React, { useEffect, Suspense } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import perflogger from 'redux-perf-middleware';
import kGlobalConstants from 'GlobalConstants';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import storeSingleton from 'redux/storeSingleton';
import WithUrlListener from 'containers/WithUrlListener';
import reducers from 'redux/reducers/index';

import { LoadingWrapper as Loading } from 'components/sharedComponents/Loading';
import MobileMessage from 'components/sharedComponents/MobileMessage';

import '_global.scss';

import { routes } from './router/RouterRoutes';

let devExtension;
let store;
if (kGlobalConstants.QAT) {
    // only enable Redux debugging in qat mode
    devExtension = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }) : undefined;
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
            <Suspense fallback={<Loading isLoading includeHeader includeFooter />}>
                <ScrollToTop />
                <Switch>
                    {routes.filter((route) => !route.hide).map(({ path, component }) => (
                        <Route
                            exact
                            path={path}
                            component={(routerProps) => WithUrlListener(component, routerProps)}
                            key={path} />
                    ))}
                </Switch>
                {window.outerWidth < 768 && <MobileMessage />}
            </Suspense>
        </BrowserRouter>
    </Provider>
);

export default AppContainer;
