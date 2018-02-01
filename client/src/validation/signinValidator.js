import isEmpty from 'lodash.isempty';
import validator from 'validator';

const signinValidator = (data) => {
  const errors = {};
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default signinValidator;
