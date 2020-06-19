import React from 'react';
import {PERMISSION_CODE} from "constants/global";

const Manager = React.lazy(() => import('containers/Manager'));

const routes = [
    {
        path: "/manager",
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: Manager
    },
    {
        path: "/manager/abc",
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER],
        isAdmin: true,
        component: () => (<div>ABC</div>)
    }
];

export default routes;
