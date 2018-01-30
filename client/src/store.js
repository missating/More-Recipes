import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from './reducers/index';
import SIGN_OUT from '../src/actions/actionTypes';

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
