import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_ERROR
} from '../actions/actionTypes';

const initialState = {
  fullname: '',
  username: '',
  email: '',
  joined: ''
};

const userProfile = (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_PROFILE:
    return {
      ...state,
      ...action.user
    };
  case GET_USER_PROFILE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  case EDIT_USER_PROFILE:
    return {
      ...state,
      ...action.user
    };
  case EDIT_USER_PROFILE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default userProfile;
