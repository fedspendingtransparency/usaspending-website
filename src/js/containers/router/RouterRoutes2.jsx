/**
 * RouterRoutes.jsx
 * Created by Kevin Li 5/26/17
 **/


// defining the routes outside of the component because React Router cannot handle state/prop
// changes that Redux causes
/* eslint-disable global-require */
export const routes = {
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
            path: '/about',
            component: (cb) => {
                require.ensure([], (require) => {
                    cb(require('components/about/About').default);
                });
            }
        }
    ]
};
/* eslint-enable global-require */
