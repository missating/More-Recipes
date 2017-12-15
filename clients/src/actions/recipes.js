import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_ALL_RECIPE } from './actionTypes';

// action creators for get all recipes
export const receiveRecipe = allRecipes => ({
  type: RECEIVE_ALL_RECIPE,
  allRecipes
});

// action for get all recipes
const receiveRecipeRequest = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('http://localhost:3000/api/v1/recipes')
    .then((response) => {
      const allrecipes = response.data.recipes;
      dispatch(receiveRecipe(allrecipes));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('All recipe error', error);
      dispatch(unsetFetching());
    });
};

export default receiveRecipeRequest;

