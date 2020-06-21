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

export const toast = {
    error: (message, options) => {
        return cogoToast.error(message, {position: 'top-right', hideAfter: 5, ...options});
    },
    success: (message, options) => {
        return cogoToast.success(message, {position: 'top-right', hideAfter: 5, ...options});
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