import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_TOP_RECIPES, GET_TOP_RECIPES_ERROR } from './actionTypes';


// action creates for get toprecipes
const topRecipes = recipes => ({
  type: GET_TOP_RECIPES,
  recipes
});

const topRecipesError = message => ({
  type: GET_TOP_RECIPES_ERROR,
  message
});


// actions for toprecipes
export const fetchTopRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('/api/v1/recipes?sort=upvote')
    .then((response) => {
      const { recipes } = response.data;
      dispatch(topRecipes(recipes));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(topRecipesError(message));
      dispatch(unsetFetching());
    });
};

export default fetchTopRecipes;
