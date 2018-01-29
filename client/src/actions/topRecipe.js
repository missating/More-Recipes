import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_TOP_RECIPES } from './actionTypes';


// action creates for get toprecipes
const getTopRecipes = recipes => ({
  type: RECEIVE_TOP_RECIPES,
  recipes
});


// actions for toprecipes
export const fetchTopRecipes = () => (dispatch) => {
  dispatch(setFetching());
  return axios.get('http://localhost:3000/api/v1/recipes?sort=upvote')
    .then((response) => {
      const topRecipes = response.data.recipes;
      dispatch(getTopRecipes(topRecipes));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      console.log('Top Reipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default fetchTopRecipes;
