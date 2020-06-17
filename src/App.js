import React from 'react';
import LoadingBar from "react-redux-loading-bar";
import RouterManager from 'routes';
import {connect} from "react-redux";
import {getUserToken} from "utils";
import {restoreToken} from "reducers/auth";

class App extends React.Component{
    componentDidMount() {
        const token = getUserToken();
        const {auth: {isLoggedIn}} = this.props;
        if(token && !isLoggedIn){
            this.props.dispatch(restoreToken());
        }
    }

    render(){
          return (
              <React.Fragment>
                  <LoadingBar className="loading-bar"/>
                  <RouterManager/>
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
