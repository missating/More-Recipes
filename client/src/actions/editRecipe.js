import axios from 'axios';
import toastr from 'toastr';
import { EDIT_RECIPE, EDIT_RECIPE_ERROR } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const editRecipeSuccess = recipe => ({
  type: EDIT_RECIPE,
  recipe
});

const editRecipeError = message => ({
  type: EDIT_RECIPE_ERROR,
  message
});

const editRecipe = (recipe, recipeId) => (dispatch) => {
  const {
    name, ingredients, description, recipeImage
  } = recipe;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'PUT',
    url: `/api/v1/recipes/${recipeId}`,
    headers: {
      token
    },
    data: {
      name, ingredients, description, recipeImage
    }
  })
    .then((response) => {
      const updatedRecipe = response.data.recipe;
      dispatch(editRecipeSuccess(updatedRecipe));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Recipe updated succesfully');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(editRecipeError(message));
      dispatch(unsetFetching());
    });
};

export default editRecipe;

