import { combineReducers } from 'redux';

import auth from './auth';

import isFetching from './isFetching';
import recipes from './recipes';
import topRecipes from './topRecipe';
import userProfile from './userProfile';
import userRecipes from './userRecipes';
import userFavourites from './userFavourites';
import pagination from './pagination';

const rootReducer = combineReducers({
  auth,
  isFetching,
  recipes,
  topRecipes,
  userProfile,
  userRecipes,
  userFavourites,
  pagination
});

export default rootReducer;
