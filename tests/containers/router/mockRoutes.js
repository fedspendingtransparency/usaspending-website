import AgencyContainer from "containers/agency/AgencyContainer";

const routes = {
    routes: [
        {
            path: '/',
            parent: '/',
            component: 'root'
        },
        {
            path: '/first',
            parent: '/first',
            silentlyUpdate: true,
            component: 'first'
        },
        {
            path: '/agency/department-of-sandwiches',
            parent: '/agency',
            silentlyUpdate: true,
            element: '<AgencyContainer/>'
        }
    ],
    notFound: {
        component: '404'
    }
};

export default routes;
