export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const login = (username, password) => {
    return {
        type: LOGIN_START,
        payload: {
            username,
            password
        }
    }
}

const inititalState = {
    isLoggedIn: false,
    userInfo: null
};

const authReducer = (state = inititalState, action) => {
    switch(action.type){
        case LOGIN_START:
            return state;
        case LOGIN_SUCCESS:
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
            return {
                ...state
            }
        default:
            return state;
    }
}

export default authReducer;