import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { RECEIVE_SINGLE_RECIPE } from './actionTypes';

// action creators for get all recipes
export const receiveSingleRecipe = recipe => ({
  type: RECEIVE_SINGLE_RECIPE,
  recipe
});


// action for get all recipes
const receiveSingleRecipeRequest = id => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`http://localhost:3000/api/v1/recipes/${id}`)
    .then((response) => {
      const { recipe } = response.data;
      dispatch(receiveSingleRecipe(recipe));
      dispatch(unsetFetching());
    }).catch((error) => {
      console.log('Single recipe error', error);
      dispatch(unsetFetching());
    });
};

export default receiveSingleRecipeRequest;
