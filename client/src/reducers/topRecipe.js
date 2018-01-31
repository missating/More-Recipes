import { GET_TOP_RECIPES } from '../actions/actionTypes';

const topRecipe = (state = {}, action) => {
  switch (action.type) {
  case GET_TOP_RECIPES:
    return {
      ...state,
      recipes: action.recipes
    };
  default:
    return state;
  }
};

export default topRecipe;
