import React from 'react';

const ManagerContainer = React.lazy(() => import('containers/manager/ManagerContainer'));

const routes = [
    {
        path: '/manager',
        component: ManagerContainer,
        auth: true
    }
];


export default routes;