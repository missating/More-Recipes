import {
  RECEIVE_USER_FAVOURITE,
  RECEIVE_USER_FAVOURITE_ERROR,
} from '../actions/actionTypes';


const initialState = {
  recipes: {}
};

const userFavourites = (state = initialState.recipes, action) => {
  switch (action.type) {
  case RECEIVE_USER_FAVOURITE:
    return {
      ...state,
      allUserFavourites: action.userFavourites
    };
  case RECEIVE_USER_FAVOURITE_ERROR:
    return {
      ...state,
      allUserFavourites: '',
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default userFavourites;
