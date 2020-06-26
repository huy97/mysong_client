import React, {Component, lazy} from 'react';
import { connect } from 'react-redux';
import styles from './Login.module.scss';
import {login, register} from "reducers/auth";
import {Redirect, withRouter} from "react-router-dom";
import { get } from 'lodash';

const LoginForm = lazy(() => import('components/Form/LoginForm'));
const RegisterForm = lazy(() => import('components/Form/RegisterForm'));

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        }
        this.setFieldError  = () => {};
    }

    handleSubmitLogin = ({username, password}, {setFieldError}) => {
        this.setFieldError = setFieldError;
        this.props.dispatch(login(username, password));
    }

    handleSubmitRegister = ({fullName, username, password, confirmPassword}, {setFieldError}) => {
        this.setFieldError = setFieldError;
        this.props.dispatch(register(fullName, username, password, confirmPassword));
    }

    handleLoginFacebook = () => {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {auth: {errors}} = this.props;
        if(prevProps.auth.errors !== this.props.auth.errors){
            errors.forEach((error) => {
               this.setFieldError(error.param, error.msg);
            });
        }
    }

    render() {
        const {showLogin} = this.state;
        const {auth: {isLoggedIn}, history} = this.props;
        if(isLoggedIn){
            let returnUrl = new URLSearchParams(get(history, 'location.search', ""));
            return <Redirect to={returnUrl.get('returnUrl') || '/'}/>;
        }
        return (
            <div className={styles.container}>
                <div className={styles.login}>
                    {
                        showLogin ?
                        <LoginForm
                            onSubmit={this.handleSubmitLogin}
                            onShowRegister={() => this.setState({showLogin: false})}
                            onLoginFacebook={this.handleLoginFacebook}
                        /> :
                        <RegisterForm
                            ref={(el) => this.registerRef = el}
                            onSubmit={this.handleSubmitRegister}
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


export default withRouter(connect(mapStateToProps)(Login));
