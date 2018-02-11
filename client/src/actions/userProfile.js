import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_USER_PROFILE } from './actionTypes';


// action creators to get user profile
export const userProfile = user => ({
  type: GET_USER_PROFILE,
  user
});

const getUserProfile = () => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'GET',
    url: '/api/v1/users/profile',
    headers: {
      token
    }
  })
    .then((response) => {
      const { user } = response.data;
      dispatch(userProfile(user));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('User profile error', error);
      dispatch(unsetFetching());
    });
};

export default getUserProfile;
