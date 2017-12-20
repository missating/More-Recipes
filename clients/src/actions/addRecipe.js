import axios from 'axios';
import { setFetching, unsetFetching } from './fetching';
import { ADD_RECIPE, ADD_RECIPE_ERROR } from '../actions/actionTypes';

// action creators
const createRecipe = recipe => ({
  type: ADD_RECIPE,
  newRecipe: recipe
});

const recipeError = message => ({
  type: ADD_RECIPE_ERROR,
  addRecipeErrorMessage: message
});


const addRecipe = recipe => (dispatch) => {
  console.log('before axios');
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
      console.log('new recipe', newRecipe);
      dispatch(createRecipe(newRecipe));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const message = error.response.data.Message;
      console.log('error', message);
      dispatch(recipeError(message));
      dispatch(unsetFetching());
    });
};
export default addRecipe;
