import React from 'react';
import PrivateRouter from "containers/PrivateRouter";
import { Route, Switch } from 'react-router-dom';
import NotFound from 'containers/NotFound';
import routes from 'routes/web';

const RouterManager = (props) => {
    return (
        <Switch>
            {
                routes.map((route, key) => {
                    if(route.auth){
                        return <PrivateRouter roles={route.roles} path={route.path} component={route.component} />;
                    }
                    return <Route exact path={route.path} component={route.component}/>;
                })
            }
            <Route component={NotFound} />
        </Switch>
    )
}

export default RouterManager;
