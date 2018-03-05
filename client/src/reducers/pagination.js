import { SHOW_PAGINATION } from '../actions/actionTypes';

const pagination = (state = {}, action) => {
  switch (action.type) {
  case SHOW_PAGINATION:
    return {
      ...state,
      currentPage: action.details.currentPage,
      limit: action.details.limit,
      pages: action.details.pages,
      numberOfItems: action.details.numberOfItems
    };
  default:
    return state;
  }
};

export default pagination;
