/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/


// defining the routes outside of the component because React Router cannot handle state/prop
// changes that Redux causes
/* eslint-disable global-require */
const routes = {
    routes: [
        {
            path: '/',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/homepage/Homepage').default);
                });
            }
        },
        {
            path: '/search',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/search/SearchPage').default);
                });
            }
        },
        {
            path: '/search/:hash',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/search/SearchPage').default);
                });
            }
        },
        {
            path: '/award/:awardId',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/award/AwardContainer').default);
                });
            }
        },
        {
            path: '/federal_account/:accountId',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/account/AccountContainer').default);
                });
            }
        },
        {
            path: '/about',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/About').default);
                });
            }
        },
        {
            path: '/db_info',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/DBInfo').default);
                });
            }
        },
        {
            path: '/relevantlegislation',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/RelevantLegislation').default);
                });
            }
        },
        {
            path: '/aboutdata',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/AboutData').default);
                });
            }
        },
        {
            path: '/sourcesofdata',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/SourcesData').default);
                });
            }
        },
        {
            path: '/faq',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/FAQ').default);
                });
            }
        },
        {
            path: '/whatsnew',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/WhatsNew').default);
                });
            }
        },
        {
            path: '/style',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/testStyles/TestStylePage').default);
                });
            }
        }
    ],
    notfound: {
        // TODO: Kevin Li - add 404 page handling
    }
};

export default routes;
/* eslint-enable global-require */
