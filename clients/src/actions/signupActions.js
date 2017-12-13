import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_AUTH, AUTH_ERROR } from './actionTypes';


// action creators for user ignup
export const getAuth = (user, token) => ({
  type: GET_AUTH,
  isAuthenticated: true,
  user,
  token
});

export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});

/**
 *
 *
 * @export
 * @param {any} formData
 * @returns {promise} axios promise
 */

// actions for user signup
const userSignupRequest = formData => (dispatch) => {
  dispatch(setFetching());
  return axios.post('http://localhost:3000/api/v1/users/signup', formData)
    .then((response) => {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(getAuth(user, token));
      dispatch(unsetFetching());
      return Promise.resolve();
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(authError(message));
      dispatch(unsetFetching());
      return Promise.reject();
    });
};


export default userSignupRequest;
