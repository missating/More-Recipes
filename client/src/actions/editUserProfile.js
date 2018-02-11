import axios from 'axios';
import toastr from 'toastr';
import { EDIT_USER_PROFILE } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const editProfileSuccess = user => ({
  type: EDIT_USER_PROFILE,
  user
});

const editProfile = userDetails => (dispatch) => {
  const {
    fullname, username
  } = userDetails;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'PUT',
    url: 'api/v1/users/profile',
    headers: {
      token
    },
    data: {
      fullname, username
    }
  })
    .then((response) => {
      const updatedProfile = response.data.user;
      dispatch(editProfileSuccess(updatedProfile));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Profile updated succesfully');
    })
    .catch((error) => {
      console.log('Edit profile error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default editProfile;

