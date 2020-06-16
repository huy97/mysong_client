import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from 'sagas';
import rootReducer from 'reducers';


const sagaMiddleware = createSagaMiddleware();
const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;