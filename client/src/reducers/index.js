import { combineReducers } from 'redux';

import auth from './auth';
import userProfile from './userProfile';
import isFetching from './isFetching';
import recipes from './recipes';
import topRecipe from './topRecipe';
import favourites from './favourites';

const appReducer = combineReducers({
  auth,
  userProfile,
  isFetching,
  recipes,
  topRecipe,
  favourites
});

export default appReducer;
