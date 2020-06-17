import React from 'react';
import {PERMISSION_CODE} from "constants/global";

const ManagerContainer = React.lazy(() => import('containers/manager/ManagerContainer'));

const routes = [
    {
        path: '/manager',
        component: ManagerContainer,
        roles: [PERMISSION_CODE.MANAGER],
        auth: true
    }
];


export default routes;
