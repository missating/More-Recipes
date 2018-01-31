import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  DELETE_RECIPE,
  EDIT_RECIPE
}
  from '../actions/actionTypes';

const initialState = {
  recipes: {}
};

const userRecipe = (state = initialState.recipes, action) => {
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
      singleRecipe: action.recipe
    };
  case DELETE_RECIPE: {
    return {
      recipes:
          state.recipes.filter(recipe => recipe.id !== action.recipeId)
    };
  }
  default:
    return state;
  }
};

export default userRecipe;
