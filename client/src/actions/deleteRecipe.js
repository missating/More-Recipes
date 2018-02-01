import axios from 'axios';
import toastr from 'toastr';
import { DELETE_RECIPE } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const deleteRecipeSuccess = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
});

const deleteRecipe = recipeId => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'DELETE',
    url: `http://localhost:3000/api/v1/recipes/${recipeId}`,
    headers: {
      token
    }
  })
    .then(() => {
      dispatch(deleteRecipeSuccess(recipeId));
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Recipe deleted succesfully');
    })
    .catch((error) => {
      console.log('Delete recipe error', error);
      dispatch(unsetFetching());
    });
};

export default deleteRecipe;
