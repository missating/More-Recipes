import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import {
  GET_USER_FAVOURITE,
  GET_USER_FAVOURITE_ERROR,
  SHOW_PAGINATION,
}
  from './actionTypes';

export const userFavourites = favourites => ({
  type: GET_USER_FAVOURITE,
  favourites
});

export const userFavouritesError = message => ({
  type: GET_USER_FAVOURITE_ERROR,
  message
});

export const pagination = details => ({
  type: SHOW_PAGINATION,
  details
});

const getUserFavourites = page => (dispatch) => {
  const pageNumber = page || 1;
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    methiod: 'GET',
    url: `/api/v1/users/favourites?page=${pageNumber}`,
    headers: {
      token
    }
  })
    .then((response) => {
      const {
        CurrentPage, Limit, NumberOfItems, Pages, favourites
      } = response.data;
      const paginationInfo = {
        CurrentPage, Limit, NumberOfItems, Pages
      };
      dispatch(userFavourites(favourites));
      dispatch(pagination(paginationInfo));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(userFavouritesError(message));
      dispatch(unsetFetching());
    });
};

export default getUserFavourites;
