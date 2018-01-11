import toastr from 'toastr';

import { SIGN_OUT } from './actionTypes';

const signOut = () => ({
  type: SIGN_OUT
});

const signUserOut = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(signOut());
  toastr.options = {
    closeButton: true,
    extendedTimeOut: "1000",
    positionClass: "toast-top-right",
    hideMethod: "fadeOut"
  };
  toastr.success('You are now logged out');
};

export default signUserOut;
