import { GET_TOP_RECIPES, GET_TOP_RECIPES_ERROR } from '../actions/actionTypes';

const topRecipe = (state = {}, action) => {
  switch (action.type) {
  case GET_TOP_RECIPES:
    return {
      ...state,
      recipes: action.recipes
    };
  case GET_TOP_RECIPES_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default topRecipe;
