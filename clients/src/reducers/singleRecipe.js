import { RECEIVE_SINGLE_RECIPE,
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERROR,
  ADD_REVIEW, 
  ADD_REVIEW_ERROR  }
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
    case ADD_REVIEW:
    return {
      ...state,
      singleRecipe: action.review,
      errorMessage: ''
    };
    case ADD_REVIEW_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default singleRecipe;
