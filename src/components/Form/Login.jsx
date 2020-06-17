import React, {Component} from 'react';
import {FastField, Form, Formik} from "formik";
import styles from "./Login.module.scss";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import ErrorMessage from "./ErrorMessage";
import {FiFacebook} from 'react-icons/fi';


const validationSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu')
});

class Login extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onShowRegister: PropTypes.func,
        onLoginFacebook: PropTypes.func
    }

    render() {
        const {onSubmit, onShowRegister, onLoginFacebook} = this.props;
        return (
            <div>
                <Formik initialValues={{
                    username: "",
                    password: ""
                }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                >
                    <Form className={styles.form}>
                        <FastField name="username">
                            {({ field, form, meta }) => (
                                <input type="text" className="form-input w100p" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="username" />
                        <FastField name="password">
                            {({ field, form, meta }) => (
                                <input type="password" className="form-input w100p mt10" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="password" />
                        <button type="submit" className="btn btn-primary w100p mt10">Đăng nhập</button>
                        <div className={styles['form-advance']}>
                            <p className='text-left'>hoặc</p>
                            <p className='text-right'>
                                <Link to={'forgot-password'}>Quên mật khẩu?</Link>
                            </p>
                        </div>
                        <button type="button" onClick={onShowRegister} className="btn w100p mt10">Đăng ký tài khoản</button>
                        <button type="button" onClick={onLoginFacebook} className="btn btn-facebook w100p mt10">
                            <span className="btn-icon"><FiFacebook size={16}/></span>
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default Login;
