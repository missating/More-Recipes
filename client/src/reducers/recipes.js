import {
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  ADD_RECIPE
} from '../actions/actionTypes';

const initialState = {
  recipes: {}
};

const recipes = (state = initialState.recipes, action) => {
  switch (action.type) {
  case GET_ALL_RECIPES:
    return {
      ...state,
      allrecipes: action.recipes
    };
  case GET_SINGLE_RECIPE:
    return {
      singleRecipe: action.recipe
    };
  case ADD_RECIPE:
    return {
      newRecipe: action.newRecipe
    };
  default:
    return state;
  }
};

export default recipes;
