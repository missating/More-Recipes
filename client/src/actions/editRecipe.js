import axios from 'axios';
import { EDIT_RECIPE } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const editRecipeSuccess = recipe => ({
  type: EDIT_RECIPE,
  recipe
});


const editRecipe = (recipe, recipeId) => (dispatch) => {
  const {
    name, ingredients, description, recipeImage
  } = recipe;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'PUT',
    url: `http://localhost:3000/api/v1/recipes/${recipeId}`,
    headers: {
      token
    },
    data: {
      name, ingredients, description, recipeImage
    }
  })
    .then((response) => {
      const updatedRecipe = response.data.recipe;
      console.log('update recipe', updatedRecipe);
      dispatch(editRecipeSuccess(updatedRecipe));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      console.log(error);
      console.log('Edit recipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default editRecipe;

