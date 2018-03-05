import axios from 'axios';
import toastr from 'toastr';
import { DELETE_RECIPE, DELETE_RECIPE_ERROR } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';
import getUserRecipes from './getUserRecipes';

const deleteRecipeSuccess = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
});

const deleteRecipeError = message => ({
  type: DELETE_RECIPE_ERROR,
  message
});

const deleteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'DELETE',
    url: `/api/v1/recipes/${recipeId}`,
    headers: {
      token
    }
  })
    .then(() => {
      dispatch(deleteRecipeSuccess(recipeId));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Recipe deleted succesfully');
      dispatch(getUserRecipes());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(deleteRecipeError(message));
      dispatch(unsetFetching());
    });
};

export default deleteRecipe;
