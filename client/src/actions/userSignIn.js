import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { SIGN_IN_USER, AUTH_ERROR } from '../actions/actionTypes';

// action creators for user signin
export const getAuth = (user, token) => ({
  type: SIGN_IN_USER,
  isAuthenticated: true,
  user,
  token
});

export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});

// actions for user signin
const fetchUserSignin = formData => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/signin', formData)
    .then((response) => {
      const { token, foundUser } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      dispatch(getAuth(foundUser, token));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(authError(message));
      dispatch(unsetFetching());
    });
};


export default fetchUserSignin;
