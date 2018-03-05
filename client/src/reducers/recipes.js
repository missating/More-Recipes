import {
  GET_ALL_RECIPES,
  GET_ALL_RECIPES_ERROR,
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_ERROR,
  ADD_REVIEW,
  ADD_REVIEW_ERROR,
  ADD_FAVOURITE,
  ADD_FAVOURITE_ERROR,
  ADD_RECIPE,
  ADD_RECIPE_ERROR,
  REMOVE_FAVOURITE,
  REMOVE_FAVOURITE_ERROR,
  SEARCH_RECIPES,
  SEARCH_RECIPES_ERROR
} from '../actions/actionTypes';

const initialState = {
  recipes: {
    allrecipes: [],
    singleRecipe: {
      id: 0,
      favourite: 0,
      Reviews: []
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
  case GET_ALL_RECIPES_ERROR:
    return {
      errorMessage: action.message
    };
  case SEARCH_RECIPES:
    return {
      ...state,
      allrecipes: action.recipes
    };
  case SEARCH_RECIPES_ERROR:
    return {
      errorMessage: action.message
    };
  case GET_SINGLE_RECIPE:
    return {
      ...state,
      singleRecipe: action.recipe
    };
  case GET_SINGLE_RECIPE_ERROR:
    return {
      errorMessage: action.message
    };
  case ADD_REVIEW:
    return {
      ...state,
      singleRecipe: {
        ...state.singleRecipe,
        Reviews: [...state.singleRecipe.Reviews, action.review]
      }
    };
  case ADD_REVIEW_ERROR:
    return {
      singleRecipe: {
        errorMessage: action.message
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
  case ADD_FAVOURITE_ERROR:
    return {
      singleRecipe: {
        ...state.singleRecipe,
        errorMessage: action.message
      }
    };
  case REMOVE_FAVOURITE:
    return {
      singleRecipe: {
        ...state.singleRecipe,
        favourite: state.singleRecipe.favourite - 1,
      }
    };
  case REMOVE_FAVOURITE_ERROR:
    return {
      singleRecipe: {
        ...state.singleRecipe,
        errorMessage: action.message
      }
    };
  case ADD_RECIPE:
    return {
      ...state,
      newRecipe: action.newRecipe
    };
  case ADD_RECIPE_ERROR:
    return {
      ...state,
      errorMessage: action.message
    };
  default:
    return state;
  }
};

export default recipes;
