import { createStore, applyMiddleware, compose } from 'redux';
// import { createStore } from 'redux';
import thunk from 'redux-thunk';
import '@babel/polyfill';
import app from './app';
import rootReducer from './reducers';
import '../assets/applications.scss';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

app(store);
