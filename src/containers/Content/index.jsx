import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom';
import { getUserToken, checkRole } from 'utils';
import NotFound from 'containers/NotFound';

export class Content extends Component {
    render() {
        const token = getUserToken();
        const {children, isPrivate, isAdmin, roles, auth: {userInfo}, history} = this.props;
        const returnUrl = history.location.pathname;
        if(isPrivate && !token){
            return <Redirect to={`/login?returnUrl=${returnUrl}`} />;
        }
        if(roles && !checkRole(roles, userInfo.permissions)){
            return <NotFound/>;
        }
        if(isAdmin){
            return (
                <div>
                    Admin Sidebar
                    {children}
                </div>
            )
        }
        return (
            <div>
                Home sidebar
                {children}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
});

export default withRouter(connect(mapStateToProps)(Content));
