import axios from 'axios';
import toastr from 'toastr';

import { setFetching, unsetFetching } from './fetching';
import {
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERROR,
  REMOVE_FAVOURITE
} from './actionTypes';
import getUserFavourites from './getUserFavourites';

const addFavouriteSuccess = () => ({
  type: ADD_FAVOURITE,
});

const removeFavouriteSuccess = () => ({
  type: REMOVE_FAVOURITE
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
    url: `/api/v1/users/${recipeId}/favourite`,
    headers: {
      token
    }
  })
    .then(({ data }) => {
      if (data.status === 'added') {
        dispatch(addFavouriteSuccess());
        dispatch(unsetFetching());
        toastr.options = {
          closeButton: true,
          extendedTimeOut: '1000',
          positionClass: 'toast-top-right',
          hideMethod: 'fadeOut'
        };
        toastr.success('Recipe favourited succesfully');
      } else if (data.status === 'removed') {
        dispatch(removeFavouriteSuccess());
        dispatch(unsetFetching());
        toastr.options = {
          closeButton: true,
          extendedTimeOut: '1000',
          positionClass: 'toast-top-right',
          hideMethod: 'fadeOut'
        };
        toastr.success('Recipe removed from Favourite');
      }
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(addFavouriteError(message));
      dispatch(unsetFetching());
    });
};

export const removeUserFavourite = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/users/${recipeId}/favourite`,
    headers: {
      token
    }
  }).then(() => {
    dispatch(getUserFavourites());
    toastr.options = {
      closeButton: true,
      extendedTimeOut: '1000',
      positionClass: 'toast-top-right',
      hideMethod: 'fadeOut'
    };
    toastr.success('Recipe removed from Favourite');
    dispatch(unsetFetching());
  });
};

export default addFavouriteRecipe;
