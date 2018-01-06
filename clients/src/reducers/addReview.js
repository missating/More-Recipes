import { ADD_REVIEW,
  ADD_REVIEW_ERROR } from '../actions/actionTypes';

const addReview = (state = {}, action) => {
  switch (action.type) {
  case ADD_REVIEW:
    return {
      ...state,
      review: action.review,
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

export default addReview;

