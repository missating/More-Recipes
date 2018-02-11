import Validator from 'validator';
import isEmpty from 'lodash.isempty';

const recipeValidator = (recipe) => {
  const errors = {};
  if (Validator.isEmpty(recipe.name)) {
    errors.name = 'Recipe name cannot be empty';
  }
  if (Validator.isEmpty(recipe.description)) {
    errors.description = 'Recipe should have a decription';
  }
  if (Validator.isEmpty(recipe.ingredients)) {
    errors.ingredients = 'Ingredients cannot be empty';
  }
  // if (Validator.isEmpty(recipe.recipeImage)) {
  //   errors.recipeImage = 'Please select an image';
  // }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default recipeValidator;
