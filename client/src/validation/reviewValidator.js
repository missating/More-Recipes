import validator from 'validator';
import isEmpty from 'lodash.isempty';

const reviewValidator = (review) => {
  const errors = {};

  if (validator.isEmpty(review.content.trim() || '')) {
    errors.content = 'Please add a review';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default reviewValidator;
