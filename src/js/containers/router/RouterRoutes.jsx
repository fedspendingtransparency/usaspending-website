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
            parent: '/',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/homepage/Homepage').default);
                });
            }
        },
        {
            path: '/search',
            parent: '/search',
            silentlyUpdate: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/search/SearchContainer').default);
                });
            }
        },
        {
            path: '/search/:hash',
            parent: '/search',
            silentlyUpdate: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/search/SearchContainer').default);
                });
            }
        },
        {
            path: '/explorer',
            parent: '/explorer',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/explorer/landing/ExplorerLanding').default);
                });
            }
        },
        {
            path: '/explorer/:root',
            parent: '/explorer',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/explorer/detail/ExplorerDetailPageContainer').default);
                });
            }
        },
        {
            path: '/award/:awardId',
            parent: '/award',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/award/AwardContainer').default);
                });
            }
        },
        {
            path: '/federal_account/:accountId',
            parent: '/federal_account',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/account/AccountContainer').default);
                });
            }
        },
        {
            path: '/agency/:agencyId',
            parent: '/agency',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/agency/AgencyContainer').default);
                });
            }
        },
        {
            path: '/about',
            parent: '/about',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/About').default);
                });
            }
        },
        {
            path: '/db_info',
            parent: '/db_info',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/DBInfo').default);
                });
            }
        },
        {
            path: '/style',
            parent: '/style',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/testStyles/TestStylePage').default);
                });
            }
        },
        {
            path: '/agency',
            parent: '/agency',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/agencyLanding/AgencyLandingPage').default);
                });
            }
        },
        {
            path: '/bulk_download',
            parent: '/bulk_download',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/bulkDownload/BulkDownloadPageContainer').default);
                });
            }
        },
        {
            path: '/bulk_download/:type',
            parent: '/bulk_download',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/bulkDownload/BulkDownloadPageContainer').default);
                });
            }
        },
        {
            path: '/keyword_search',
            parent: '/keyword_search',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/keyword/KeywordContainer').default);
                });
            }
        }
    ],
    notFound: {
        component: (cb) => {
            require.ensure([], (require) => {
                cb(require('components/errorPage/ErrorPage').default);
            });
        }
    }
};

export default routes;
/* eslint-enable global-require */
