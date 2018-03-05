import {
  GET_USER_FAVOURITE,
  GET_USER_FAVOURITE_ERROR
} from '../actions/actionTypes';


const userFavourites = (state = {}, action) => {
  switch (action.type) {
  case GET_USER_FAVOURITE:
    return {
      ...state,
      favourites: action.favourites
    };
  case GET_USER_FAVOURITE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default userFavourites;
