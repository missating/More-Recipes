import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_ALL_RECIPES } from './actionTypes';

// action creators for get all recipes
export const allRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

// action for get all recipes
const getAllRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('/api/v1/recipes')
    .then((response) => {
      const { recipes } = response.data;
      dispatch(allRecipes(recipes));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('All recipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default getAllRecipes;

