import React from 'react';
import PrivateRouter from "containers/PrivateRouter";
import { Route, Switch } from 'react-router-dom';

const RouterManager = (props) => {
    const {routes} = props;
    return (
        <Switch>
            {
                routes.map((route, key) => {
                    if(route.auth){
                        return <PrivateRouter roles={route.roles} path={route.path} component={route.component} />;
                    }
                    return <Route path={route.path} component={route.component}/>;
                })
            }
        </Switch>
    )
}

export default RouterManager;
