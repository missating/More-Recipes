import { RECEIVE_ALL_RECIPE } from '../actions/actionTypes';

const initialState = {
  recipes: []
};

const allRecipes = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_ALL_RECIPE:
    return {
      ...state,
      recipes: action.allRecipes,
    };
  default:
    return state;
  }
};

export default allRecipes;
