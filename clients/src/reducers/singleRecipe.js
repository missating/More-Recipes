import { RECEIVE_SINGLE_RECIPE,
  EDIT_RECIPE,
  EDIT_RECIPE_ERROR }
  from '../actions/actionTypes';

const singleRecipe = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_SINGLE_RECIPE:
    return action.recipe;
  case EDIT_RECIPE:
    return {
      ...state,
      singleRecipe: action.recipe,
      editRecipeSuccess: true
    };
  case EDIT_RECIPE_ERROR:
    return {
      ...state,
      editRecipeError: true
    };
  default:
    return state;
  }
};

export default singleRecipe;
