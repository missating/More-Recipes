import axios from 'axios';
import toastr from 'toastr';
import Dropzone from 'react-dropzone';

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
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success('Recipe added succesfully');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(recipeError(message));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.error(message);
    });
};

export default addRecipe;
