import { RECEIVE_SINGLE_RECIPE,
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERROR }
  from '../actions/actionTypes';

const singleRecipe = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_SINGLE_RECIPE:
    return action.recipe;
  case ADD_FAVOURITE:
    return {
      ...state,
      singleRecipe: action.recipe,
      errorMessage: ''
    };
  case ADD_FAVOURITE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default singleRecipe;
