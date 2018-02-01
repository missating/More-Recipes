import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import {
  GET_USER_FAVOURITE,
  GET_USER_FAVOURITE_ERROR
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

const getUserFavourites = () => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    methiod: 'GET',
    url: 'http://localhost:3000/api/v1/users/favourites',
    headers: {
      token
    }
  })
    .then((response) => {
      const { favourites } = response.data;
      dispatch(userFavourites(favourites));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(userFavouritesError(message));
      dispatch(unsetFetching());
    });
};

export default getUserFavourites;
