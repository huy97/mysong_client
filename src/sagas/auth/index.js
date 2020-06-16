import {takeEvery, call, put} from "@redux-saga/core/effects";
import {LOGIN_START, LOGIN_SUCCESS} from "reducers/auth";
import {login, getUserInfo} from "services/auth";
import {setUserToken} from "utils";
import {toast} from "utils";

function* handleLogin(action) {
    const {username, password} = action.payload;
    try{
        const loginResult = yield call(login, username, password);
        yield call(setUserToken, loginResult.accessToken);
        const userInfoResult = yield call(getUserInfo);
        yield put({type: LOGIN_SUCCESS, payload: {
            userInfo: userInfoResult.data
            }});
    }catch (e) {
        if(e.message){
            yield call(toast.error, e.message);
        }
    }
}

function* watchLogin() {
    yield takeEvery(LOGIN_START, handleLogin);
}

export default watchLogin;