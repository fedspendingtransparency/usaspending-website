/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/


// defining the routes outside of the component because React Router cannot handle state/prop
// changes that Redux causes
/* eslint-disable global-require */

const kGlobalConstants = require("../../GlobalConstants");

const routes = {
    routes: [
        {
            path: '/',
            parent: '/',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/homepage/Homepage').default);
                });
            }
        },
        {
            path: '/search',
            parent: '/search',
            addToSitemap: true,
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
            addToSitemap: false,
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
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/explorer/landing/ExplorerLanding').default);
                });
            }
        },
        {
            path: '/explorer/:root',
            parent: '/explorer',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/explorer/detail/ExplorerDetailPageContainer').default);
                });
            }
        },
        {
            path: '/award/:awardId',
            parent: '/award',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/award/AwardContainer').default);
                });
            }
        },
        {
            path: '/federal_account/:accountNumber',
            parent: '/federal_account',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/account/AccountContainer').default);
                });
            }
        },
        {
            path: '/agency/:agencyId',
            parent: '/agency',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/agency/AgencyContainer').default);
                });
            }
        },
        {
            path: '/about',
            parent: '/about',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/About').default);
                });
            }
        },
        {
            path: '/about/accessibility',
            parent: '/about',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/legal/AccessibilityPage').default);
                });
            }
        },
        {
            path: '/about/privacy',
            parent: '/about',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/legal/PrivacyPage').default);
                });
            }
        },
        {
            path: '/about/foia',
            parent: '/about',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/legal/FOIAPage').default);
                });
            }
        },
        {
            path: '/db_info',
            parent: '/db_info',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/DBInfo').default);
                });
            }
        },
        {
            path: '/style',
            parent: '/style',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/testStyles/TestStylePage').default);
                });
            }
        },
        {
            path: '/agency',
            parent: '/agency',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/agencyLanding/AgencyLandingPage').default);
                });
            }
        },
        {
            path: '/download_center',
            parent: '/download_center',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/bulkDownload/BulkDownloadPageContainer').default);
                });
            }
        },
        {
            path: '/download_center/:type',
            parent: '/download_center',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/bulkDownload/BulkDownloadPageContainer').default);
                });
            }
        },
        {
            path: '/keyword_search',
            parent: '/keyword_search',
            addToSitemap: true,
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
            addToSitemap: false,
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
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/accountLanding/AccountLandingPage').default);
                });
            }
        },
        {
            path: '/state',
            parent: '/state',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/stateLanding/StateLandingPage').default);
                });
            }
        },
        {
            path: '/state/:stateId',
            parent: '/state',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/state/StateContainer').default);
                });
            }
        },
        {
            path: '/state/:stateId/:fy',
            parent: '/state',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/state/StateContainer').default);
                });
            }
        },
        {
            path: '/recipient',
            parent: '/recipient',
            addToSitemap: true,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/recipientLanding/RecipientLandingPage').default);
                });
            }
        },
        {
            path: '/recipient/:recipientId',
            parent: '/recipient',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/recipient/RecipientContainer').default);
                });
            }
        },
        {
            path: '/recipient/:recipientId/:fy',
            parent: '/recipient',
            addToSitemap: false,
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

if (kGlobalConstants.DEV) {
    routes.routes.push(
        {
            path: '/agency_v2/:agencyId',
            parent: '/agency',
            addToSitemap: false,
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('containers/agency/AgencyContainerV2').default);
                });
            }
        }
    );
}

module.exports = routes;

/* eslint-enable global-require */
