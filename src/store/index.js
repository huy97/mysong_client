import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from 'sagas';
import rootReducer from 'reducers';
import {loadingBarMiddleware} from "react-redux-loading-bar";


const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware, loadingBarMiddleware())));
sagaMiddleware.run(rootSaga);

export default store;
