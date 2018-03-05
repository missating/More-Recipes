import axios from 'axios';
import toastr from 'toastr';
import { EDIT_USER_PROFILE, EDIT_USER_PROFILE_ERROR } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const editProfileSuccess = user => ({
  type: EDIT_USER_PROFILE,
  user
});

const editProfileError = message => ({
  type: EDIT_USER_PROFILE_ERROR,
  message
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
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Profile updated succesfully');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(editProfileError(message));
      dispatch(unsetFetching());
    });
};

export default editProfile;

