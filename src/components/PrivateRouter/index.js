import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";

class PrivateRouter extends Component {

    render() {
        const {path, component, auth: {isLoggedIn, userInfo}} = this.props;
        if(!isLoggedIn || !userInfo){
            return <Redirect to={'/login'} />;
        }
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

export default connect(
    mapStateToProps,
)(PrivateRouter);