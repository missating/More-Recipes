import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_AUTH, AUTH_SIGN_IN_ERROR } from './actionTypes';

// action creators for user signin
export const getAuth = (user, token) => ({
  type: GET_AUTH,
  isAuthenticated: true,
  user,
  token
});

export const authSigninError = message => ({
  type: AUTH_SIGN_IN_ERROR,
  isAuthenticated: false,
  message
});

// actions for user signin
const userSigninRequest = formData => (dispatch) => {
  dispatch(setFetching());
  return axios.post('http://localhost:3000/api/v1/users/signin', formData)
    .then((response) => {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(getAuth(user, token));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(authSigninError(message));
      dispatch(unsetFetching());
    });
};


export default userSigninRequest;
