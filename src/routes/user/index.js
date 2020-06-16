import React from 'react';

const HomeContainer = React.lazy(() => import('containers/home/HomeContainer'));
const LoginContainer = React.lazy(() => import('containers/auth/LoginContainer'));

const routes = [
    {
        path: "/",
        component: HomeContainer
    },
    {
        path: "/login",
        component: LoginContainer
    }
];

export default routes;