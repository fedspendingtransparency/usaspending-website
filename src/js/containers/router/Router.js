/**
 * Router.js
 * Created by Kevin Li 5/26/17
 */

import pathToRegExp from 'path-to-regexp';
import { createHashHistory as createHistory } from 'history';
import queryString from 'query-string';

import Routes from './RouterRoutes';

export class RouterSingleton {
    constructor() {
        // we need a reference to our React container that will be responsible for rendering
        this.reactContainer = null;

        this.hashChanged = this.hashChanged.bind(this);

        // set up history tracking
        this.history = createHistory();
        this.history.listen(this.hashChanged);

        // external modules can grab URL data by accessing the singleton's state property
        this.state = {
            path: '/',
            parent: '/',
            params: {},
            query: {}
        };

        this.loaderTime = null;
    }

    startRouter() {
        // wait for the router container to ready itself before starting the router
        this.parseRoute(this.history.location);
    }

    hashChanged(location) {
        this.parseRoute(location);
    }

    parseRoute(location) {
        // parse the route
        // default to the 404 page, it'll be overwritten if we match with a route later
        let componentReference = Routes.notFound.component;
        for (const route of Routes.routes) {
            const path = route.path;
            const pathData = this.matchRoute(location, path);
            if (pathData) {
                // we matched, stop the loop
                // add in the search params
                componentReference = route.component;

                // check if we should be able to silently update this route
                let silentlyUpdate = route.silentlyUpdate;
                if (!route.silentlyUpdate) {
                    // force undefined to false when the key doesn't exist
                    silentlyUpdate = false;
                }

                this.state = Object.assign({}, pathData, {
                    silentlyUpdate,
                    parent: route.parent
                });
                break;
            }
        }

        // load the component asynchronously
        // but because of network conditions, it could take a long time to load the module
        if (this.loaderTime) {
            // cancel any previous timers
            window.clearTimeout(this.loaderTime);
        }

        // trigger a slow load event after 1.5 seconds
        this.loaderTime = window.setTimeout(() => {
            // have the React router container show a loading spinner
            this.reactContainer.showSpinner();
        }, 1500);

        this.loadComponent(componentReference)
            .then((component) => {
                if (this.reactContainer) {
                    // the JS module has loaded
                    // have the react container mount the target component and pass down any
                    // matched params
                    this.reactContainer.navigateToComponent(component, this.state);
                }

                if (this.loaderTime) {
                    // the module loaded, cancel the spinner timer
                    window.clearTimeout(this.loaderTime);
                }
            });
    }

    matchRoute(location, path) {
        const regex = pathToRegExp(path);
        const matches = regex.exec(location.pathname);

        if (!matches) {
            return null;
        }

        // match the arguments to the path keys (if any)
        const pathData = {
            path: matches[0],
            params: {},
            query: {}
        };

        const pathKeys = pathToRegExp.parse(path);
        if (pathKeys.length > 1) {
            // there are named keys, add them as key-value pairs to the params object
            for (let i = 1; i < pathKeys.length; i++) {
                const namedKey = pathKeys[i];
                const name = namedKey.name;
                pathData.params[name] = matches[i];
            }
        }

        // parse any query strings
        const parsedQuery = queryString.parse(location.search);
        pathData.query = parsedQuery;

        return pathData;
    }

    loadComponent(loader) {
        // wrap the async module loader in a promise
        return new Promise((resolve) => {
            loader((component) => {
                resolve(component);
            });
        });
    }
}

const routerInstance = new RouterSingleton();

export default routerInstance;
