import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_TOP_RECIPES } from './actionTypes';

const recieveTopRecipes = recipes => ({
  type: RECEIVE_TOP_RECIPES,
  recipes
});


export const receiveTopRecipeRequest = () => (dispatch) => {
  dispatch(setFetching());
  console.log('before axios');
  return axios.get('http://localhost:3000/api/v1/recipes?sort=upvotes&order=descending')
    .then((response) => {
      const topRecipes = response.data.recipes;
      console.log('top recipes', topRecipes);
      console.log('after axios');
      dispatch(recieveTopRecipes(topRecipes));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      console.log(error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default receiveTopRecipeRequest;
