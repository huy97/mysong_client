import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import  store from 'store';
import 'normalize.css';
import "./index.scss";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
