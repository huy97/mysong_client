import React, {Component} from 'react';
import {FastField, Form, Formik} from "formik";
import styles from "./Login.module.scss";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import ErrorMessage from "./ErrorMessage";
import {FiFacebook} from 'react-icons/fi';


const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Vui lòng nhập tên hiển thị'),
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([Yup.ref('password'), null], 'Hai mật khẩu không giống nhau'),
});

class RegisterForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onShowLogin: PropTypes.func,
        onLoginFacebook: PropTypes.func
    }

    static defaultProps = {
        onSubmit: () => {},
        onShowLogin: () => {},
        onLoginFacebook: () => {}
    }

    render() {
        const { onSubmit, onShowLogin, onLoginFacebook } = this.props;
        return (
            <div>
                <Formik initialValues={{
                    fullName: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className={styles.form}>
                        <FastField name="fullName">
                            {({ field, form, meta }) => (
                                <input type="text" placeholder={"Tên hiển thị"} className="form-input w100p" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="fullName" />
                        <FastField name="username">
                            {({ field, form, meta }) => (
                                <input type="text" placeholder={"Tên đăng nhập"} className="form-input w100p mt10" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="username" />
                        <FastField name="password">
                            {({ field, form, meta }) => (
                                <input type="password" placeholder={'Mật khẩu'} className="form-input w100p mt10" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="password" />
                        <FastField name="confirmPassword">
                            {({ field, form, meta }) => (
                                <input type="password" placeholder={'Nhập lại mật khẩu'} className="form-input w100p mt10" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="confirmPassword" />
                        <button type="submit" className="btn btn-primary w100p mt10">Tạo tài khoản</button>
                        <div className={styles['form-advance']}>
                            <p className='text-left'>hoặc</p>
                            <p className='text-right'>
                                <Link to={'forgot-password'}>Quên mật khẩu?</Link>
                            </p>
                        </div>
                        <button type="button" onClick={onShowLogin} className="btn w100p mt10">Đăng nhập</button>
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

export default RegisterForm;
