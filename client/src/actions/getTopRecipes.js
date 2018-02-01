import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_TOP_RECIPES } from './actionTypes';


// action creates for get toprecipes
const topRecipes = recipes => ({
  type: GET_TOP_RECIPES,
  recipes
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
      console.log('Top Reipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default fetchTopRecipes;
