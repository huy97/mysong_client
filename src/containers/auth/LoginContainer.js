import React, {Component, lazy} from 'react';
import { connect } from 'react-redux';
import styles from './LoginContainer.module.scss';
const Login = lazy(() => import('components/Form/Login'));
const Register = lazy(() => import('components/Form/Register'));

export class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        }
    }

    handleSubmit = (values) => {
        console.log(values);
    }

    handleLoginFacebook = () => {
        console.log('Hi')
    }

    render() {
        const {showLogin} = this.state;
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

});

export default connect(mapStateToProps)(LoginContainer)
