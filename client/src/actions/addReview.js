import axios from 'axios';
import toastr from 'toastr';

import { setFetching, unsetFetching } from './fetching';
import { ADD_REVIEW, ADD_REVIEW_ERROR } from './actionTypes';

export const addReviewSuccess = review => ({
  type: ADD_REVIEW,
  review
});

const addReviewError = message => ({
  type: ADD_REVIEW_ERROR,
  message
});

const addReview = (content, recipeId) => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'POST',
    url: `http://localhost:3000/api/v1/recipes/${recipeId}/review`,
    headers: {
      token
    },
    data: { content }
  })
    .then((response) => {
      const { review } = response.data;
      dispatch(addReviewSuccess(review));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Review added succesfully');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(addReviewError(message));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.error(message);
    });
};

export default addReview;

