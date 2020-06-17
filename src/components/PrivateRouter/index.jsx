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

    componentWillUnmount() {
        console.log(this.props)
    }

    render() {
        const {path, component, history} = this.props;
        const token = getUserToken();
        const returnUrl = history.location.pathname;
        if(!token){
            return <Redirect to={`/login?returnUrl=${returnUrl}`} />;
        }
        if(this.checkRole()){
            return (
                <Route exact path={path} component={component}/>
            );
        }
        return <NotFound></NotFound>;
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
