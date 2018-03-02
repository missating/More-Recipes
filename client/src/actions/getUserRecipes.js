import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  SHOW_PAGINATION
}
  from './actionTypes';

// action creators for get all recipes
export const userRecipes = recipes => ({
  type: GET_USER_RECIPES,
  recipes
});

export const userRecipesError = message => ({
  type: GET_USER_RECIPES_ERROR,
  message
});

export const pagination = details => ({
  type: SHOW_PAGINATION,
  details
});


// action for get all user recipes
const getUserRecipes = page => (dispatch) => {
  const pageNumber = page || 1;
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'GET',
    url: `/api/v1/recipes/user/recipes?page=${pageNumber}`,
    headers: {
      token
    }
  })
    .then((response) => {
      const {
        currentPage, limit, numberOfItems, pages, recipes
      } = response.data;
      const paginationInfo = {
        currentPage, limit, numberOfItems, pages
      };
      dispatch(userRecipes(recipes));
      dispatch(pagination(paginationInfo));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(userRecipesError(message));
      dispatch(unsetFetching());
    });
};

export default getUserRecipes;
