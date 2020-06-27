import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootSaga from 'sagas';
import rootReducer from 'reducers';
import {loadingBarMiddleware} from "react-redux-loading-bar";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['']
  };
const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware, loadingBarMiddleware())));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
