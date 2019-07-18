import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducers from './store/reducers/auth';
import homeReducers from './store/reducers/home';
import shopReducers from './store/reducers/shop';
import ordersReducers from './store/reducers/orders';
import loadingReducers from './store/reducers/loading';
import resetpassReducer from './store/reducers/resetpass';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducers,
    home: homeReducers,
    shop: shopReducers,
    orders: ordersReducers,
    loading: loadingReducers,
    resetpass: resetpassReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store} >
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
