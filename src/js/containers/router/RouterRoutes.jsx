/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/
import { hashHistory } from 'react-router';

import StoreSingleton from '../../redux/storeSingleton';
import HomePage from '../../components/HomePage';
import SearchPage from '../../components/search/SearchPage';

let instance = null;
let store = new StoreSingleton().store;

const getStore = () => {
    if (!store) {
        store = new StoreSingleton().store;
    }
    return store;
};

const goToPage = (location, replace) => {
    getStore();

    const path = location.pathname;

    let pushMethod = hashHistory.push;
    if (replace) {
        pushMethod = replace;
    }

    pushMethod(path);
};


// defining the routes outside of the component because React Router cannot handle state/prop
// changes that Redux causes
const routeDefinitions = {
    path: '/',
    indexRoute: {
        component: HomePage
    },
    childRoutes: [
        {
            path: 'search',
            component: SearchPage
        }
    ]
};

export default class RouterRoutes {
    constructor() {
        if (!instance) {
            instance = this;
        }

        instance.routes = () => routeDefinitions;
        instance.goTo = (location) => goToPage(location);

        return instance;
    }

}
