import { GET_AUTH, AUTH_ERROR, AUTH_SIGN_IN_ERROR } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        user: action.user,
        token: action.token
      });
    case AUTH_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      });
    case AUTH_SIGN_IN_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessageSignin: action.message
      });
    default:
      return state;
  }
};

export default auth;
