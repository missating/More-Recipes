import { RECEIVE_USER_PROFILE } from '../actions/actionTypes';

const userProfile = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_USER_PROFILE:
    return Object.assign({}, state, action.userDetails);
  default:
    return state;
  }
};

export default userProfile;
