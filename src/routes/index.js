import React from 'react';
import { Route, Switch } from 'react-router-dom';
import adminRoutes from 'routes/admin';
import userRoutes from 'routes/user';

const Home = React.lazy(() => import('containers/Home'));
const Login = React.lazy(() => import('containers/Login'));
const Content = React.lazy(() => import('containers/Content'));
const NotFound = React.lazy(() => import('containers/NotFound'));

const RouterManager = (props) => {
    return (
        <Switch>
            <Route exact path="/">
                <Content>
                    <Home/>
                </Content>
            </Route>
            {
                [...adminRoutes, ...userRoutes].map(({component: Component, isPrivate, roles, path, isAdmin}, key) => {
                    return (
                        <Route exact path={path}>
                            <Content isPrivate={isPrivate} isAdmin={isAdmin} roles={roles}>
                                <Component/>
                            </Content>
                        </Route>
                    )
                })
            }
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default RouterManager;
