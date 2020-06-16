import cogoToast from "cogo-toast";

export const getUserToken = () => {
    return localStorage.getItem('token');
}

export const setUserToken = (token) => {
    localStorage.setItem('token', token);
}

export const removeUserToken = () => {
    localStorage.removeItem('token');
}

export const toast = {
    error: (message, options) => {
        return cogoToast.error(message, {position: 'top-right', hideAfter: 5, ...options});
    }
}