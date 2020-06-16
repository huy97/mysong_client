import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from 'components/Form/ErrorMessage';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu')
  });

export class LoginContainer extends Component {
    handleSubmit = (values) => {
        console.log(values);
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.login}>
                    <Formik initialValues={{
                        username: "",
                        password: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                    >
                        <Form>
                            <FastField name="username">
                            {({ field, form, meta }) => (
                                <input type="text" className="form-input w100p" {...field}/>
                            )}
                            </FastField>
                            <ErrorMessage name="username" />
                            <FastField name="password">
                            {({ field, form, meta }) => (
                                <input type="password" className="form-input w100p mt10" {...field}/>
                            )}
                            </FastField>
                            <ErrorMessage name="password" />
                            <button type="submit" className="btn btn-primary mt10">Đăng nhập</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(LoginContainer)
