import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR,
  EDIT_RECIPE,
  EDIT_RECIPE_ERROR
}
  from '../actions/actionTypes';


const userRecipe = (state = {}, action) => {
  switch (action.type) {
  case GET_USER_RECIPES:
    return {
      ...state,
      recipes: action.recipes
    };
  case GET_USER_RECIPES_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  case EDIT_RECIPE:
    return {
      ...state,
      recipe: action.recipe
    };
  case EDIT_RECIPE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  case DELETE_RECIPE: {
    return {
      recipes:
          state.recipes.filter(recipe => recipe.id !== action.recipeId)
    };
  }
  case DELETE_RECIPE_ERROR: {
    return {
      errorMessage: action.message
    };
  }
  default:
    return state;
  }
};

export default userRecipe;
