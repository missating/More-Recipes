import { combineReducers } from 'redux';

import auth from './auth';
import userProfile from './userProfile';
import isFetching from './isFetching';
import allRecipes from './recipes';
import singleRecipe from './singleRecipe';
import topRecipe from './topRecipe';
import addRecipe from './addRecipe';
import userRecipes from './userRecipes';
import userFavourites from './userFavourites';

const appReducer = combineReducers({
  auth,
  userProfile,
  isFetching,
  allRecipes,
  singleRecipe,
  topRecipe,
  addRecipe,
  userRecipes,
  userFavourites
});

export default appReducer;
