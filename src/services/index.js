import axios from 'axios';
import {API_URL} from "constants/global";
import store from "store";
import {hideLoading, showLoading} from "react-redux-loading-bar";

const instance = axios.create({
    baseURL: API_URL,
    // withCredentials: true,
    timeout: 30000
});

instance.interceptors.request.use(function (config) {
    store.dispatch(showLoading());
    config.headers.common['Authorization'] = localStorage.getItem('token');
    return config;
}, function (error) {
    store.dispatch(hideLoading());
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    store.dispatch(hideLoading());
    console.log("Response: ", response.data);
    return response.data;
}, function (error) {
    store.dispatch(hideLoading());
    console.log("Error resp: ", error.response.data);
    return Promise.reject(error.response.data);
});


export default instance;
