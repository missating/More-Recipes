import axios from 'axios';
import toastr from 'toastr';
import { EDIT_RECIPE } from './actionTypes';
import { setFetching, unsetFetching } from './fetching';

const editRecipeSuccess = recipe => ({
  type: EDIT_RECIPE,
  recipe
});


const editRecipe = (recipe, recipeId) => (dispatch) => {
  const { name, ingredients, description } = recipe;
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'PUT',
    url: `http://localhost:3000/api/v1/recipes/${recipeId}`,
    headers: {
      token
    },
    data: {
      name, ingredients, description
    }
  })
    .then((response) => {
      const updatedRecipe = response.data.recipe;
      dispatch(editRecipeSuccess(updatedRecipe));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Recipe updated succesfully');
    })
    .catch((error) => {
      console.log('Edit recipes error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default editRecipe;

