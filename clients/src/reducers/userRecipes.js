import { RECEIVE_USER_RECIPES } from '../actions/actionTypes';

const initialState = {
  recipes: {}
};
// [1, 2, 3]
const userRecipe = (state = initialState.recipes, action) => {
  switch (action.type) {
  case RECEIVE_USER_RECIPES:
    return {
      ...state,
      allUserRecipes: action.userRecipes
    };
  default:
    return state;
  }
};

export default userRecipe;
