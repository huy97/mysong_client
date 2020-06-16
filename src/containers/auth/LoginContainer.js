import React, {Component, lazy} from 'react';
import { connect } from 'react-redux';
import styles from './LoginContainer.module.scss';
import {login} from "reducers/auth";
import {Redirect} from "react-router-dom";
const Login = lazy(() => import('components/Form/Login'));
const Register = lazy(() => import('components/Form/Register'));

export class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        }
    }

    handleSubmit = ({username, password}) => {
        this.props.dispatch(login(username, password));
    }

    handleLoginFacebook = () => {

    }

    render() {
        const {showLogin} = this.state;
        const {auth: {isLoggedIn}, history} = this.props;
        if(isLoggedIn){
            let returnUrl = new URLSearchParams(history.location.search);
            return <Redirect to={returnUrl.get('returnUrl') || '/'}/>;
        }
        return (
            <div className={styles.wrapper}>
                <div className={styles.login}>
                    {
                        showLogin ?
                            <Login
                                onSubmit={this.handleSubmit}
                                onShowRegister={() => this.setState({showLogin: false})}
                                onLoginFacebook={this.handleLoginFacebook}
                            /> :
                            <Register
                                onSubmit={this.handleSubmit}
                                onShowLogin={() => this.setState({showLogin: true})}
                                onLoginFacebook={this.handleLoginFacebook}
                            />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
});


export default connect(mapStateToProps)(LoginContainer)
