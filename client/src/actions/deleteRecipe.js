import axios from 'axios';
import { DELETE_RECIPE } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const deleteRecipeSuccess = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
});

const deleteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log('befor axios');
  dispatch(setFetching());
  return axios({
    method: 'DELETE',
    url: `http://localhost:3000/api/v1/recipes/${recipeId}`,
    headers: {
      token
    }
  })
    .then(() => {
      console.log(`Deleted ${recipeId}`);
      dispatch(deleteRecipeSuccess(recipeId));
      dispatch(unsetFetching());
      console.log('after axios');
    })
    .catch((error) => {
      console.log('Delete recipe error', error);
      dispatch(unsetFetching());
    });
};

export default deleteRecipe;
