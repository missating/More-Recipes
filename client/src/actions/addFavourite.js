import axios from 'axios';

import { setFetching, unsetFetching } from './fetching';
import { ADD_FAVOURITE, ADD_FAVOURITE_ERROR } from './actionTypes';

const addFavouriteSuccess = recipe => ({
  type: ADD_FAVOURITE,
  recipe
});

const addFavouriteError = message => ({
  type: ADD_FAVOURITE_ERROR,
  message
});

const addFavouriteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log('before axios');
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `http://localhost:3000/api/v1/users/${recipeId}/favourite`,
    headers: {
      token
    }
  })
    .then(() => {
      console.log(`fav ${recipeId}`);
      dispatch(addFavouriteSuccess(recipeId));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(addFavouriteError(message));
      dispatch(unsetFetching());
    });
};

export default addFavouriteRecipe;
