import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_RECIPE_SUCCESS, GET_RECIPE_FAILURE } from './actionTypes';

// action creators for get all recipes
export const getRecipeSuccess = allRecipes => ({
  type: GET_RECIPE_SUCCESS,
  allRecipes
});

export const getRecipeFailure = message => ({
  type: GET_RECIPE_FAILURE,
  message
});


// action for get all recipes
const getRecipe = () => (dispatch) => {
  dispatch(setFetching());
  console.log('before axios');
  return axios.get('http://localhost:3000/api/v1/recipes')
    .then((response) => {
      console.log('axios respoonse is', response);
      const allrecipes = response.data.recipes;
      dispatch(getRecipeSuccess(allrecipes));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(getRecipeFailure(message));
      dispatch(unsetFetching());
    });
};

export default getRecipe;

