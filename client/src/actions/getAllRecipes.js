import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_ALL_RECIPES, SHOW_PAGINATION } from './actionTypes';

// action creators for get all recipes
export const allRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

export const pagination = details => ({
  type: SHOW_PAGINATION,
  details
});

// action for get all recipes
const getAllRecipes = page => (dispatch) => {
  const pageNumber = page || 1;
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes?page=${pageNumber}`)
    .then((response) => {
      const { CurrentPage, Limit, NumberOfItems, Pages, recipes } = response.data;
      const paginationInfo = { CurrentPage, Limit, NumberOfItems, Pages };
      dispatch(allRecipes(recipes));
      dispatch(pagination(paginationInfo));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('All recipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default getAllRecipes;

