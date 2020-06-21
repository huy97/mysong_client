// import React from 'react';
import Home from 'containers/Home';
// import {PERMISSION_CODE} from "constants/global";

const routes = [
    {
        path: "/music/:slug/:shortCode.html",
        component: Home
    },
    {
        path: "/video/:slug/:shortCode.html",
        component: Home
    }
];

export default routes;
