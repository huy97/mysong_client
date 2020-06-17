import React from 'react';
import LoadingBar from "react-redux-loading-bar";
import RouterManager from 'routes';
import {connect} from "react-redux";
import {getUserToken} from "utils";
import {LOGIN_FAILURE, restoreToken} from "reducers/auth";
import SplashScreen from "./components/SplashScreen";

class App extends React.Component{

    componentDidMount() {
        const token = getUserToken();
        const {auth: {isLoggedIn}} = this.props;
        if(token && !isLoggedIn){
            this.props.dispatch(restoreToken());
        }else {
            this.props.dispatch({type: LOGIN_FAILURE});
        }
    }

    render(){
        const {auth: {isRestoreToken}} = this.props;
        return (
            <React.Fragment>
                <LoadingBar className="loading-bar"/>
                {isRestoreToken ? <SplashScreen/> : <RouterManager/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps)(App);
