import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_USER_FAVOURITE,
  RECEIVE_USER_FAVOURITE_ERROR }
  from '../actions/actionTypes';

export const getFavouritesSuccess = userFavourites => ({
  type: RECEIVE_USER_FAVOURITE,
  userFavourites
});

export const getFavouritesError = message => ({
  type: RECEIVE_USER_FAVOURITE_ERROR,
  message
});

const receiveUserFavourites = () => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    methiod: 'GET',
    url: 'http://localhost:3000/api/v1/users/favourites',
    headers: {
      token
    }
  })
    .then((response) => {
      const userFavourites = response.data.favourites;
      dispatch(getFavouritesSuccess(userFavourites));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(getFavouritesError(message));
      dispatch(unsetFetching());
    });
};

export default receiveUserFavourites;
