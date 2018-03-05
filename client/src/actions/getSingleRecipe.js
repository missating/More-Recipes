import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { GET_SINGLE_RECIPE, GET_SINGLE_RECIPE_ERROR } from './actionTypes';

// action creators for get all recipes
export const singleRecipe = recipe => ({
  type: GET_SINGLE_RECIPE,
  recipe
});

export const singleRecipeError = message => ({
  type: GET_SINGLE_RECIPE_ERROR,
  message
});


// action for get all recipes
const getSingleRecipe = id => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes/${id}`)
    .then((response) => {
      const { recipe } = response.data;
      dispatch(singleRecipe(recipe));
      dispatch(unsetFetching());
    }).catch((error) => {
      const { message } = error.response.data;
      dispatch(singleRecipeError(message));
      dispatch(unsetFetching());
    });
};

export default getSingleRecipe;
