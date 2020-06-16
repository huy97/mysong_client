import {LOGIN_URL} from "constants/global";
import services from "services";
import {GET_USER_INFO_URL} from "constants/global";

export const login = async (username, password) => {
    return await services.post(LOGIN_URL, {
        username,
        password
    });
}

export const getUserInfo = async () => {
    return await services.get(GET_USER_INFO_URL);
}