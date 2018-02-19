import {
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  ADD_REVIEW,
  ADD_FAVOURITE,
  ADD_RECIPE,
  REMOVE_FAVOURITE,
  SEARCH_RECIPES,
  SEARCH_RECIPES_ERROR
} from '../actions/actionTypes';

const initialState = {
  recipes: {
    allrecipes: [],
    singleRecipe: {
      id: 0
    }
  }
};

const recipes = (state = initialState.recipes, action) => {
  switch (action.type) {
  case GET_ALL_RECIPES:
    return {
      ...state,
      allrecipes: action.recipes
    };
  case SEARCH_RECIPES:
    return {
      ...state,
      allrecipes: action.recipes
    };
  case SEARCH_RECIPES_ERROR:
    return {
      ...state,
      allrecipes: []
    };
  case GET_SINGLE_RECIPE:
    return {
      ...state,
      singleRecipe: action.recipe
    };
  case ADD_REVIEW:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Reviews: [...state.singleRecipe.Reviews, action.review]
      }
    };
  case ADD_FAVOURITE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        favourite: state.singleRecipe.favourite + 1,
      }
    };
  case REMOVE_FAVOURITE:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        favourite: state.singleRecipe.favourite - 1,
      }
    };
  case ADD_RECIPE:
    return {
      ...state,
      newRecipe: action.newRecipe
    };
  default:
    return state;
  }
};

export default recipes;
