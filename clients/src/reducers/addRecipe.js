import { ADD_RECIPE, ADD_RECIPE_ERROR } from '../actions/actionTypes';

const initialState = {
  recipes: {
  }
};

const addRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
  case ADD_RECIPE:
    return {
      ...state,
      newRecipe: action.newRecipe,
      errorMessage: ''
    };
  case ADD_RECIPE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default addRecipe;
