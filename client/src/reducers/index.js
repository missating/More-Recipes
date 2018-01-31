import { combineReducers } from 'redux';

import auth from './auth';

import isFetching from './isFetching';
import recipes from './recipes';
import topRecipes from './topRecipe';
import userProfile from './userProfile';
import userRecipes from './userRecipes';

const rootReducer = combineReducers({
  auth,
  isFetching,
  recipes,
  topRecipes,
  userProfile,
  userRecipes
});

export default rootReducer;
