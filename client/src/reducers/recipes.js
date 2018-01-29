import findIndex from 'lodash/findIndex';

import {
  RECEIVE_ALL_RECIPE,
  RECEIVE_SINGLE_RECIPE,
  RECEIVE_USER_RECIPES,
  RECEIVE_USER_RECIPES_ERROR,
  ADD_RECIPE,
  ADD_RECIPE_ERROR,
  ADD_FAVOURITE,
  ADD_REVIEW
}
  from '../actions/actionTypes';

const initialState = {
  recipes: [],
  errorMessage: ''
};

const recipes = (state = initialState, action) => {
  const index = findIndex(
    state.recipes,
    recipe => parseInt(recipe.id, 10) === parseInt(action.recipe, 10)
  );
  switch (action.type) {
  case RECEIVE_ALL_RECIPE:
    return {
      ...state,
      recipes: action.allRecipes
    };
  case RECEIVE_SINGLE_RECIPE:
    return {
      ...state,
      recipes: action.recipe
    };
  case RECEIVE_USER_RECIPES:
    return {
      ...state,
      recipes: action.userRecipes
    };
  case RECEIVE_USER_RECIPES_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  case ADD_RECIPE:
    return {
      ...state,
      recipes: [
        ...state.recipes,
        action.newRecipe
      ]
    };
  case ADD_RECIPE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  case ADD_FAVOURITE:
    if (index > -1) {
      return {
        ...state,
        recipes: [{
          ...state.recipes[index],
          favourite: parseInt(state.recipes[index].favourite, 10) + 1,
        },
        ...state.recipes.slice(0, index),
        ...state.recipes.slice(index + 1)
        ]
      };
    }
    return state;
  case ADD_REVIEW:
    return {
      recipes: [{
        ...state.recipes[0],
        Reviews: [
          ...state.recipes[0].Reviews,
          action.review
        ]
      }]
    };
  default:
    return state;
  }
};

export default recipes;
