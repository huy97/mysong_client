import React from 'react';
// import {PERMISSION_CODE} from "constants/global";

const Dashboard = React.lazy(() => import('components/Manager/Dashboard'));

const routes = [
    {
        path: "/",
        component: Dashboard
    }
];


export default routes;
