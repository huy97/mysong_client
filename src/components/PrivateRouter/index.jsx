import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Redirect, Route, withRouter} from "react-router-dom";
import {getUserToken} from "utils";
import NotFound from "components/NotFound";

class PrivateRouter extends Component {

    checkRole = () => {
        const {roles, auth: {userInfo}} = this.props;
        let valid = false;
        if(roles && roles.length){
            if(userInfo && userInfo.permissions){
                roles.forEach((role) => {
                    if(userInfo.permissions.includes(role)){
                        valid = true;
                        return false;
                    }
                });
            }
        }
        return valid;
    }

    render() {
        const {path, component, history} = this.props;
        const returnUrl = history.location.pathname;
        const token = getUserToken();
        if(!token){
            return <Redirect to={`/login?returnUrl=${returnUrl}`} />;
        }
        if(!this.checkRole())
            return (
                <Route exact path={path} component={NotFound}/>
            );
        return (
            <Route exact path={path} component={component}/>
        );
    }
}

PrivateRouter.propTypes = {
    path: PropTypes.string,
    component: PropTypes.elementType
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
});

export default withRouter(connect(
    mapStateToProps,
)(PrivateRouter));
