import {
  RECEIVE_USER_FAVOURITE,
  RECEIVE_USER_FAVOURITE_ERROR
} from '../actions/actionTypes';


const initialState = {
  favourites: []
};

const favourites = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_USER_FAVOURITE:
    return {
      ...state,
      favourites: action.userFavourites
    };
  case RECEIVE_USER_FAVOURITE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default favourites;
