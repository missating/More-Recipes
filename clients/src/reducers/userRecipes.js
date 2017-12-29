import { RECEIVE_USER_RECIPES,
  RECEIVE_USER_RECIPES_ERROR,
  DELETE_RECIPE,
  EDIT_RECIPE }
  from '../actions/actionTypes';

const initialState = {
  recipes: {}
};

const userRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
  case RECEIVE_USER_RECIPES:
    return {
      ...state,
      allUserRecipes: action.userRecipes
    };
  case RECEIVE_USER_RECIPES_ERROR:
    return {
      ...state,
      allUserRecipes: '',
      errorMessage: action.message
    };
  case EDIT_RECIPE:
    return {
      ...state,
      singleRecipe: action.recipe,
      editRecipeSuccess: true
    };
  case DELETE_RECIPE: {
    return {
      allUserRecipes:
      state.allUserRecipes.filter(recipe => recipe.id !== action.recipeId)
    };
  }
  default:
    return state;
  }
};

export default userRecipe;
