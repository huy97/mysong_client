import React, {Component} from 'react';
import {connect} from 'react-redux';

class Can extends Component {
    checkPermission = () => {
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
        const {children} = this.props;
        if(this.checkPermission())
            return children;
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
}

export default connect(
    mapStateToProps,
)(Can);
