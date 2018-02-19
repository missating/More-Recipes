import axios from 'axios';
import toastr from 'toastr';

import { setFetching, unsetFetching } from './fetching';
import getSingleRecipe from './getSingleRecipe';

const upvoteRecipe = (recipeId, queryType) => (dispatch) => {
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
        positionClass: 'toast-top-right',
        hideMethod: 'fadeOut'
      };
      toastr.success(data.message);
    })
    .catch((error) => {
      console.log('Upvote recipe error', error.response.data.message);
      dispatch(unsetFetching());
    });
};

export default upvoteRecipe;
