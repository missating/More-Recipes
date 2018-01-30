import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_USER_PROFILE } from './actionTypes';

// action creators to get user profile
export const receiveUserProfile = userDetails => ({
  type: RECEIVE_USER_PROFILE,
  userDetails
});

const receiveUserProfileRequest = () => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'GET',
    url: 'http://localhost:3000/api/v1/users/profile',
    headers: {
      token
    }
  })
    .then((response) => {
      const userProfile = response.data.user;
      dispatch(receiveUserProfile(userProfile));
      dispatch(unsetFetching());
    }).catch((error) => {
      // console.log('User profile error', error);
      dispatch(unsetFetching());
    });
};

export default receiveUserProfileRequest;
