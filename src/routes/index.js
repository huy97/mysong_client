import React, { Suspense, Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminRoute from 'routes/admin';
import UserRoute from 'routes/user';
import SplashScreen from 'components/SplashScreen';
import NotFound from 'components/NotFound';
import { connect } from 'react-redux';
import PrivateRouter from "../components/PrivateRouter";

const RouterManager = () => {
    return (
        <Suspense fallback={<SplashScreen/>}>
            <BrowserRouter>
                <Switch>
                    {[...AdminRoute, ...UserRoute].map((route, key) => {
                        if(route.auth){
                            return <PrivateRouter key={key} path={route.path} component={route.component} />
                        }
                        return (
                            <Route key={key} exact path={route.path} component={route.component}/>
                        )
                    })}
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}

export default RouterManager;