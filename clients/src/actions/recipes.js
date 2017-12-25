import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_ALL_RECIPE } from './actionTypes';

// action creators for get all recipes
export const getRecipes = allRecipes => ({
  type: RECEIVE_ALL_RECIPE,
  allRecipes
});

// action for get all recipes
const fetchAllRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('http://localhost:3000/api/v1/recipes')
    .then((response) => {
      const allrecipes = response.data.recipes;
      dispatch(getRecipes(allrecipes));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('All recipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default fetchAllRecipes;

