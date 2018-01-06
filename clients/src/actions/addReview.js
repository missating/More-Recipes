import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { ADD_REVIEW, ADD_REVIEW_ERROR } from './actionTypes';

export const createReview = review => ({
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
    data: content
  })
    .then((response) => {
      console.log('response from server is', response);
      const { createdReview } = response.data;
      console.log('Review in addReview is', createdReview);
      dispatch(createReview(createdReview));
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(addReviewError(message));
      dispatch(unsetFetching());
    });
};

export default addReview;

