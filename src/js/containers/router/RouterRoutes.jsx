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
                    cb(require('components/article/DBInfo').default);
                });
            }
        },
        {
            path: '/relevantlegislation',
            parent: '/relevantlegislation',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/RelevantLegislation').default);
                });
            }
        },
        {
            path: '/aboutdata',
            parent: '/aboutdata',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/AboutData').default);
                });
            }
        },
        {
            path: '/sourcesofdata',
            parent: '/sourcesofdata',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/SourcesData').default);
                });
            }
        },
        {
            path: '/faq',
            parent: '/faq',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/FAQ').default);
                });
            }
        },
        {
            path: '/whatsnew',
            parent: '/whatsnew',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/article/WhatsNew').default);
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
            path: '/download',
            parent: '/download',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/download/DownloadPage').default);
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
