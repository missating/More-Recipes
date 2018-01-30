import Validator from 'validator';
import isEmpty from 'lodash.isempty';

const recipeValidator = (recipe) => {
  const errors = {};
  if (Validator.isEmpty(recipe.name)) {
    errors.name = 'Recipe name is empty';
  }
  if (Validator.isEmpty(recipe.description)) {
    errors.description = 'Recipe should have a decription';
  }
  if (Validator.isEmpty(recipe.ingredients)) {
    errors.ingredients = 'Ingredients field cannot be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default recipeValidator;
