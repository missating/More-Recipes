import { combineReducers } from 'redux';

import auth from './auth';

import isFetching from './isFetching';
import receiveRecipe from './recipes';
import singleRecipe from './singleRecipe';
import topRecipe from './topRecipe';

const rootReducer = combineReducers({
  auth,
  isFetching,
  receiveRecipe,
  singleRecipe,
  topRecipe
});

export default rootReducer;
