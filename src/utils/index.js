import cogoToast from "cogo-toast";
import {CDN_URL} from "constants/global";

export const getUserToken = () => {
    return localStorage.getItem('token');
}

export const setUserToken = (token) => {
    localStorage.setItem('token', token);
}

export const removeUserToken = () => {
    localStorage.removeItem('token');
}

export const getSkip = (currentPage, pageSize) => {
    return (currentPage - 1) * pageSize;
}

export const getCDN = (url) => {
    return CDN_URL + url;
}

export const setFormErrors = (form, errors = []) => {
    if(!form) return false;
    let fields = errors.map((obj) => {
        return {
            name: [obj.param],
            value: obj.value,
            errors: [obj.msg]
        }
    });
    form.setFields(fields);
    return true;
}

export const prepareTime = (time) => {
    if(time._isAMomentObject)
        return time.hours(23).minutes(59).seconds(59).utc();
    return time;
}

export const toast = {
    error: (message, options) => {
        return cogoToast.error(message, {position: 'top-right', hideAfter: 5, ...options});
    },
    success: (message, options) => {
        return cogoToast.success(message, {position: 'top-right', hideAfter: 5, ...options});
    },
    info: (message, options) => {
        return cogoToast.info(message, {position: 'top-right', hideAfter: 5, ...options});
    },
    warn: (message, options) => {
        return cogoToast.warn(message, {position: 'top-right', hideAfter: 5, ...options});
    },
    loading: (message, options) => {
        return cogoToast.loading(message, {position: 'top-right', hideAfter: 5, ...options});
    }
}

export const checkRole = (userPermissions = [], routePermissions = []) => {
    let valid = false;
    routePermissions.forEach((permission) => {
        if(userPermissions.includes(permission)){
            valid = true;
            return false;
        }
    });
    return valid;
}