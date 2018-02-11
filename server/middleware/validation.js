import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import Validator from 'validator';

export const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers.token || req.query.token;

  try {
    const verifiedToken = jwt.verify(token, process.env.MY_SECRET);
    req.userId = verifiedToken.id;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }
};

export const verifySignin = (req, res, next) => {
  const { email, password } = req.body;
  const error = {};

  if (Validator.isEmpty(password || '')) {
    error.password = 'Password is required';
  }

  if (!Validator.isEmail(email || '')) {
    error.email = 'Please provide a valid email address';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};


export const verifySignup = (req, res, next) => {
  const {
    fullname, username, email, password, confirmPassword
  } = req.body;
  const error = {};

  if (Validator.isEmpty(fullname || '')) {
    error.fullname = 'Fullname is required';
  }

  if (Validator.isEmpty(username || '')) {
    error.username = 'Username is required';
  }

  if (Validator.isEmpty(password || '') ||
    Validator.isEmpty(confirmPassword || '') ||
    (confirmPassword.trim() !== password.trim())) {
    error.password = 'Passwords mismatch or empty';
  }

  if (!Validator.isEmail(email || '')) {
    error.email = 'Email address is empty or invalid';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};

export const verifyNewRecipe = (req, res, next) => {
  const {
    name, ingredients, description, recipeImage
  } = req.body;

  const error = {};

  if (Validator.isEmpty(name || '')) {
    error.name = 'Recipe name is required';
  }

  if (Validator.isEmpty(ingredients || '')) {
    error.ingredients = 'ingredients for recipe is required';
  }

  if (Validator.isEmpty(description || '')) {
    error.description = 'Description for recipe is required';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};

