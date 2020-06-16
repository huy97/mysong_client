import { combineReducers } from "redux";
import authReducer from './auth';
import {loadingBarReducer} from "react-redux-loading-bar";

const rootReducer = combineReducers({
    authReducer,
    loadingBar: loadingBarReducer
});

export default rootReducer;