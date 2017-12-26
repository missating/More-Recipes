import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_USER_RECIPES } from './actionTypes';

// action creators for get all recipes
export const receiveUserRecipe = userRecipes => ({
  type: RECEIVE_USER_RECIPES,
  userRecipes
});


// action for get all user recipes
const receiveUserRecipes = () => (dispatch) => {
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
      const userRecipes = response.data.recipes;
      dispatch(receiveUserRecipe(userRecipes));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('user recipes error', error);
      dispatch(unsetFetching());
    });
};

export default receiveUserRecipes;
