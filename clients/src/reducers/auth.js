import { RECEIVE_AUTH, AUTH_ERROR, SIGN_IN_USER, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
};

const auth = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_AUTH:
    return {
      ...state,
      isAuthenticated: true,
      errorMessage: '',
      user: action.user,
      token: action.token
    };
  case AUTH_ERROR:
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: action.message
    };
  case SIGN_IN_USER:
    return {
      ...state,
      isAuthenticated: true,
      errorMessage: '',
      user: action.user,
      token: action.token
    };
  case SIGN_OUT:
    return {
      ...state,
      isAuthenticated: false,
      user: '',
      token: ''
    };
  default:
    return state;
  }
};

export default auth;
