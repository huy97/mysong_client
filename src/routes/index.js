import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminRoute from 'routes/admin';
import UserRoute from 'routes/user';
import SplashScreen from 'components/SplashScreen';
import NotFound from 'components/NotFound';
import { connect } from 'react-redux';

export class RouterManager extends React.Component {
    render() {
        const {isLoggedIn} = this.props;
        return (
            <Suspense fallback={SplashScreen}>
                <BrowserRouter>
                    <Switch>
                        {[...AdminRoute, ...UserRoute].map((route, key) => {
                            if(route.auth && !isLoggedIn){
                                return <Route key={key} exact path={route.path} render={() => <Redirect to="login"/>}/>;
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
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(RouterManager);
