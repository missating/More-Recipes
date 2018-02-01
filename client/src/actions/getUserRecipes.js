import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import {
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR
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


// action for get all user recipes
const getUserRecipes = () => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'GET',
    url: 'http://localhost:3000/api/v1/recipes/user/allrecipes',
    headers: {
      token
    }
  })
    .then((response) => {
      const { recipes } = response.data;
      dispatch(userRecipes(recipes));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(userRecipesError(message));
      dispatch(unsetFetching());
    });
};

export default getUserRecipes;
