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
        }
    ],
    notFound: {
        component: '404'
    }
};

export default routes;
