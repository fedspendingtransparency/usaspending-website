/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/
import { hashHistory } from 'react-router';

import StoreSingleton from 'redux/storeSingleton';

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
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('components/homepage/Homepage').default);
            });
        }
    },
    childRoutes: [
        {
            path: 'search',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/search/SearchPage').default);
                });
            }
        },
        {
            path: 'about',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/about/About').default);
                });
            }
        },
        {
            path: 'db_info',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/article/DBInfo').default);
                });
            }
        },
        {
            path: 'award/:awardId',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../award/AwardContainer').default);
                });
            }
        },
        {
            path: 'federal_account/:accountId',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../account/AccountContainer').default);
                });
            }
        },
        {
            path: 'style',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/testStyles/TestStylePage').default);
                });
            }
        },
        {
            path: 'relevantlegislation',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/article/RelevantLegislation').default);
                });
            }
        },
        {
            path: 'aboutdata',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/article/AboutData').default);
                });
            }
        },
        {
            path: 'sourcesofdata',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/article/SourcesData').default);
                });
            }
        },
        {
            path: 'faq',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/article/FAQ').default);
                });
            }
        },
        {
            path: 'whatsnew',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('components/article/WhatsNew').default);
                });
            }
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
