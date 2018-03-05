import isEmpty from 'lodash.isempty';
import validator from 'validator';

const signinValidator = (data) => {
  const errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Invalid credentials. Please try again';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default signinValidator;
