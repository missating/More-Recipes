import { SIGN_OUT } from './actionTypes';


const signOut = () => ({
  type: SIGN_OUT
});

const signUserOut = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(signOut());
};

export default signUserOut;
