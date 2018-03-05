import axios from 'axios';
import toastr from 'toastr';

import { setFetching, unsetFetching } from './fetching';
import getSingleRecipe from './getSingleRecipe';

const voteRecipe = (recipeId, queryType) => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: `/api/v1/recipes/${recipeId}/vote?vote=${queryType}`,
    headers: {
      token
    }
  })
    .then(({ data }) => {
      dispatch(getSingleRecipe(recipeId));
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true,
        extendedTimeOut: '1000',
        positionClass: 'toast-bottom-right',
        hideMethod: 'fadeOut'
      };
      toastr.success(data.message);
    })
    .catch((error) => {
      Promise.reject(error);
      dispatch(unsetFetching());
    });
};

export default voteRecipe;
