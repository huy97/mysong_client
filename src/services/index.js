import axios from 'axios';
import {API_URL} from "../constants/global";

const instance = axios.create({
    baseURL: API_URL,
    timeout: 30000
});

instance.interceptors.request.use(function (config) {
    config.headers.common['Authorization'] = localStorage.getItem('token');
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    console.log("Response: ", response.data);
    return response.data;
}, function (error) {
    console.log("Error resp: ", error.response.data);
    return Promise.reject(error.response.data);
});


export default instance;