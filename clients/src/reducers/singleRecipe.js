import { RECEIVE_SINGLE_RECIPE } from '../actions/actionTypes';

const singleRecipe = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_RECIPE:
      return Object.assign({}, state, action.recipe);
    default:
      return state;
  }
};

export default singleRecipe;

