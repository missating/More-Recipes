import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { ADD_RECIPE, ADD_RECIPE_ERROR } from './actionTypes';

// action creators
export const createRecipe = newRecipe => ({
  type: ADD_RECIPE,
  newRecipe
});

export const recipeError = message => ({
  type: ADD_RECIPE_ERROR,
  message
});


// actions for add recipe
const addRecipe = recipe => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'POST',
    url: 'http://localhost:3000/api/v1/recipes',
    headers: {
      token
    },
    data: recipe
  })
    .then((response) => {
      const newRecipe = response.data.recipe;
      dispatch(createRecipe(newRecipe));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(recipeError(message));
      dispatch(unsetFetching());
    });
};

export default addRecipe;
