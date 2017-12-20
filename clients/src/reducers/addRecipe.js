import { ADD_RECIPE, ADD_RECIPE_ERROR } from '../actions/actionTypes';

const initialState = {
  recipes: {
  }
};


const addRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
  case ADD_RECIPE:
    return Object.assign({}, state, {
      addRecipeErrorMessage: '',
      newRecipe: action.newRecipe
    });
  case ADD_RECIPE_ERROR:
    return Object.assign({}, state, {
      addRecipeErrorMessage: action.addRecipeErrorMessage
    });
  default:
    return state;
  }
};
export default addRecipe;
