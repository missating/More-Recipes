import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_AUTH, AUTH_ERROR } from '../actions/actionTypes';


// action creators for user ignup
export const getAuth = (user, token) => ({
  type: RECEIVE_AUTH,
  isAuthenticated: true,
  user,
  token
});

export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});


// actions for user signup
const fetchUserSignup = formData => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/signup', formData)
    .then((response) => {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(getAuth(user, token));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(authError(message));
      dispatch(unsetFetching());
    });
};

export default fetchUserSignup;
