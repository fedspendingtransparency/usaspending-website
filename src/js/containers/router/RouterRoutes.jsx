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
                    cb(require('containers/awardV2/AwardV2Container').default);
                });
            }
        },
        {
            path: '/federal_account/:accountNumber',
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
            path: '/about/accessibility',
            parent: '/about',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/legal/AccessibilityPage').default);
                });
            }
        },
        {
            path: '/about/privacy',
            parent: '/about',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/legal/PrivacyPage').default);
                });
            }
        },
        {
            path: '/about/foia',
            parent: '/about',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/legal/FOIAPage').default);
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
            path: '/download_center',
            parent: '/download_center',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/bulkDownload/BulkDownloadPageContainer').default);
                });
            }
        },
        {
            path: '/download_center/:type',
            parent: '/download_center',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/bulkDownload/BulkDownloadPageContainer').default);
                });
            }
        },
        {
            path: '/keyword_search',
            parent: '/keyword_search',
            silentlyUpdate: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/keyword/KeywordContainer').default);
                });
            }
        },
        {
            path: '/keyword_search/:keyword',
            parent: '/keyword_search',
            silentlyUpdate: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/keyword/KeywordContainer').default);
                });
            }
        },
        {
            path: '/federal_account',
            parent: '/federal_account',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/accountLanding/AccountLandingPage').default);
                });
            }
        },
        {
            path: '/state',
            parent: '/state',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/stateLanding/StateLandingPage').default);
                });
            }
        },
        {
            path: '/state/:stateId',
            parent: '/state',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/state/StateContainer').default);
                });
            }
        },
        {
            path: '/recipient',
            parent: '/recipient',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/recipientLanding/RecipientLandingPage').default);
                });
            }
        },
        {
            path: '/recipient/:recipientId',
            parent: '/recipient',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/recipient/RecipientContainer').default);
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
