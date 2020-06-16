import React from 'react';
import {ErrorMessage as ErrMsg} from 'formik';

const ErrorMessage = (props) => {
    const {className, component} = props;
    return (
        <ErrMsg className={`error-message ${className}`} component={component ?? 'span'} {...props}/>
    )
}

export default ErrorMessage;