import {
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  ADD_REVIEW,
  ADD_FAVOURITE,
  ADD_RECIPE
} from '../actions/actionTypes';

const initialState = {
  recipes: {
    allrecipes: [],
    singleRecipe: {}
  }
};

const recipes = (state = initialState.recipes, action) => {
  switch (action.type) {
  case GET_ALL_RECIPES:
    return {
      ...state,
      allrecipes: action.recipes
    };
  case GET_SINGLE_RECIPE:
    return {
      singleRecipe: action.recipe
    };
  case ADD_REVIEW:
    return {
      singleRecipe: {
        ...state.singleRecipe,
        Reviews: [...state.singleRecipe.Reviews, action.review]
      }
    };
  case ADD_FAVOURITE:
    return {
      singleRecipe: {
        ...state.singleRecipe,
        favourite: state.singleRecipe.favourite + 1,
      }
    };
  case ADD_RECIPE:
    return {
      newRecipe: action.newRecipe
    };
  default:
    return state;
  }
};

export default recipes;
