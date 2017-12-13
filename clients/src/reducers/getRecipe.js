import { GET_RECIPE_SUCCESS, GET_RECIPE_FAILURE } from '../actions/actionTypes';

const initialState = {
  recipes: {
  }
};

const getRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_RECIPE_SUCCESS:
      return Object.assign({}, state, {
        allRecipes: action.allRecipes,
        errorMessage: ''
      });
    case GET_RECIPE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    default:
      return state;
  }
};

export default getRecipe;
