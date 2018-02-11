import { SHOW_PAGINATION } from '../actions/actionTypes';

const initialState = {
  recipes: {
  }
};

const pagination = (state = initialState.recipes, action) => {
  switch (action.type) {
    case SHOW_PAGINATION:
      return {
        ...state,
        currentPage: action.details.CurrentPage,
        limit: action.details.Limit,
        pages: action.details.Pages,
        numberOfItems: action.details.NumberOfItems
      };
    default:
      return state;
  }
};

export default pagination;