const inititalState = {
    isLoggedIn: false,
    auth: null
};

const authReducer = (state = inititalState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default authReducer;