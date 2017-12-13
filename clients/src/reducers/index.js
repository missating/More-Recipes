import { combineReducers } from 'redux';

import auth from './auth';

import isFetching from './isFetching';
import getRecipe from './getRecipe';

const rootReducer = combineReducers({
  auth,
  isFetching,
  getRecipe
});

export default rootReducer;
