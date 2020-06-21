import {LOGIN_URL, REGISTER_URL, GET_USER_INFO_URL} from "constants/global";
import services from "services";

export const login = async (username, password) => {
    return await services.post(LOGIN_URL, {
        username,
        password
    });
}
export const register = async (fullName, username, password, confirmPassword) => {
    return await services.post(REGISTER_URL, {
        fullName,
        username,
        password,
        confirmPassword
    });
}

export const getUserInfo = async () => {
    return await services.get(GET_USER_INFO_URL);
}
