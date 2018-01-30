import axios from 'axios';
import toastr from 'toastr';

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
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `http://localhost:3000/api/v1/users/${recipeId}/favourite`,
    headers: {
      token
    }
  })
    .then(() => {
      dispatch(addFavouriteSuccess(recipeId));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Recipe favourited succesfully');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(addFavouriteError(message));
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

export default addFavouriteRecipe;
