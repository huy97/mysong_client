import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from 'routes/admin';
import UserRoute from 'routes/user';
import SplashScreen from 'components/SplashScreen';
import NotFound from 'components/NotFound';
import PrivateRouter from "components/PrivateRouter";

const RouterManager = () => {
    return (
        <Suspense fallback={<SplashScreen/>}>
            <BrowserRouter>
                <Switch>
                    {[...AdminRoute, ...UserRoute].map((route, key) => {
                        if(route.auth){
                            return <PrivateRouter key={key} roles={route.roles} path={route.path} component={route.component} />;
                        }
                        return <Route key={key} exact path={route.path} component={route.component}/>;
                    })}
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default RouterManager;
