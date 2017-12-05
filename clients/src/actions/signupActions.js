import axios from 'axios';


/**
 *
 *
 * @export
 * @param {any} userData
 * @returns {promise} axios promise
 */
export default function userSignupRequest(userData) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/v1/users/signup', userData);
  };
}
