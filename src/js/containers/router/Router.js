/**
 * Router.js
 * Created by Kevin Li 5/26/17
 */

import pathToRegexp from 'path-to-regexp';
import createHistory from 'history/createHashHistory';

import { routes } from './RouterRoutes2';

class RouterSingleton {
    constructor() {
        // we need a reference to our React container that will be responsible for rendering
        this.reactContainer = null;

        this.hashChanged = this.hashChanged.bind(this);

        // set up history tracking
        this.history = createHistory();
        this.history.listen(this.hashChanged);
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
        const current = location.pathname;
        let matched = null;
        let componentLoader = null;
        for (const route of routes.routes) {
            const path = route.path;
            const pathData = this.matchRoute(path, current);
            if (pathData) {
                // we matched, stop the loop
                // add in the search params
                matched = pathData;
                componentLoader = route.component;
                break;
            }
        }

        if (matched && componentLoader) {
            // we matched a route
            this.loadComponent(componentLoader)
                .then((component) => {
                    if (this.reactContainer) {
                        this.reactContainer.navigateToComponent(component, matched);
                    }
                });
        }
    }

    matchRoute(path, current) {
        const regex = pathToRegexp(path);
        const matches = regex.exec(current);

        if (!matches) {
            return null;
        }

        // match the arguments to the path keys (if any)
        const pathData = {
            path: matches[0],
            params: {}
        };
        const pathKeys = pathToRegexp.parse(path);
        if (pathKeys.length > 1) {
            // there are named keys
            for (let i = 1; i < pathKeys.length; i++) {
                const namedKey = pathKeys[i];
                const name = namedKey.name;
                pathData.params[name] = matches[i];
            }
        }

        return pathData;
    }

    loadComponent(loader) {
        return new Promise((resolve) => {
            loader((component) => {
                resolve(component);
            });
        });
    }
}

const routerInstance = new RouterSingleton();

export default routerInstance;
