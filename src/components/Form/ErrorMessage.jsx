import React from 'react';
import {ErrorMessage as ErrMsg} from 'formik';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
    const {className, component} = props;
    return (
        <ErrMsg {...props} className={`error-message ${className}`} component={component ?? 'span'}/>
    )
}

ErrorMessage.propTypes = {
    className: PropTypes.string,
    component: PropTypes.object
}

export default ErrorMessage;
