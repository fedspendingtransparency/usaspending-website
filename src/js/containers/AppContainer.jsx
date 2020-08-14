/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import perflogger from 'redux-perf-middleware';
import kGlobalConstants from 'GlobalConstants';

import storeSingleton from 'redux/storeSingleton';
import reducers from 'redux/reducers/index';
import * as glossaryActions from 'redux/actions/glossary/glossaryActions';

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

const GlossaryListener = ({
    history,
    glossary,
    match,
    location,
    showGlossary,
    setTermFromUrl,
    Child
}) => {
    useEffect(() => {
        if (glossary.display === false && history.location.search.includes('glossary')) {
            const termStr = history.location.search.split('glossary=')[1];
            showGlossary();
            setTermFromUrl(termStr);
            history.replace(history.location.path);
        }
    }, [history, glossary.display, history.location.search, setTermFromUrl, showGlossary]);
    return <Child {...{ history, match, location }} />;
};

GlossaryListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    glossary: PropTypes.object,
    showGlossary: PropTypes.func,
    setTermFromUrl: PropTypes.func,
    Child: PropTypes.object
};

const GlossaryListenerContainer = connect(
    (state) => ({
        glossary: state.glossary
    }),
    (dispatch) => ({
        showGlossary: () => dispatch(glossaryActions.showGlossary()),
        setTermFromUrl: (term) => dispatch(glossaryActions.setTermFromUrl(term))
    })
)(GlossaryListener);


const withGlossaryListener = (component, props) => (
    <GlossaryListenerContainer {...props} Child={component} />
);

export default class AppContainer extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {routes.map(({ path, component }) => (
                            <Route
                                exact
                                path={path}
                                component={(routerProps) => withGlossaryListener(component, routerProps)}
                                key={path} />
                        ))}
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
