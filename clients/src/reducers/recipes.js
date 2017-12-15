import { RECEIVE_ALL_RECIPE } from '../actions/actionTypes';

const initialState = {
  recipes: {
  }
};

const allRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
    case RECEIVE_ALL_RECIPE:
      return Object.assign({}, state, {
        allRecipes: action.allRecipes,
      });
    default:
      return state;
  }
};

export default allRecipe;
