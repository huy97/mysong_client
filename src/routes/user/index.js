import React from 'react';
// import {PERMISSION_CODE} from "constants/global";

const Login = React.lazy(() => import('containers/Login'));

const routes = [
    {
        path: "/abc",
        component: Login
    }
];

export default routes;
