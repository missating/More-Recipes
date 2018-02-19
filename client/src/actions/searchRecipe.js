import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import {
  SEARCH_RECIPES,
  SHOW_PAGINATION,
  SEARCH_RECIPES_ERROR
} from './actionTypes';


// action creator
export const search = recipes => ({
  type: SEARCH_RECIPES,
  recipes
});

export const pagination = details => ({
  type: SHOW_PAGINATION,
  details
});

export const searchError = () => ({
  type: SEARCH_RECIPES_ERROR
});

const searchRecipes = (searchQuery, page) => (dispatch) => {
  const pageNumber = page || 1;
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/recipes/search?search=${searchQuery}&page=${pageNumber}`
  })
    .then((response) => {
      const {
        CurrentPage, Limit, NumberOfItems, Pages, recipes
      } = response.data;
      const paginationInfo = {
        CurrentPage, Limit, NumberOfItems, Pages
      };
      dispatch(search(recipes));
      dispatch(pagination(paginationInfo));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(searchError(message));
      dispatch(unsetFetching());
    });
};

export default searchRecipes;

