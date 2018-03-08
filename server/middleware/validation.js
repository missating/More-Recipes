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

  if (!password) {
    error.password = 'Password is required';
  }

  if (password && Validator.isEmpty(password.trim() || '')) {
    error.password = 'Password is required';
  }

  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !Validator.isEmail(email.trim() || '')) {
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

  if (!fullname) {
    error.fullname = 'Fullname is required';
  }

  if (fullname && Validator.isEmpty(fullname.trim() || '')) {
    error.fullname = 'Fullname is required';
  }

  if (!username) {
    error.username = 'Username is required';
  }

  if (username && Validator.isEmpty(username.trim() || '')) {
    error.username = 'Username is required';
  }

  if (!password) {
    error.password = 'Password is required';
  }

  if (!confirmPassword) {
    error.password = 'Please confirm your password';
  }

  if (Validator.isEmpty(password || '') ||
    Validator.isEmpty(confirmPassword || '') ||
    (confirmPassword.trim() !== password.trim())) {
    error.password = 'Passwords mismatch or empty';
  }

  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !Validator.isEmail(email.trim() || '')) {
    error.email = 'Email address is empty or invalid';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};

export const verifyRecipe = (req, res, next) => {
  const {
    name, ingredients, description,
  } = req.body;

  const error = {};

  if (!name) {
    error.name = 'Recipe name is required';
  }

  if (name && Validator.isEmpty(name.trim() || '')) {
    error.name = 'Recipe name is required';
  }

  if (!ingredients) {
    error.ingredients = 'ingredients for recipe is required';
  }

  if (ingredients && Validator.isEmpty(ingredients.trim() || '')) {
    error.ingredients = 'ingredients for recipe is required';
  }

  if (!description) {
    error.description = 'Description for recipe is required';
  }

  if (description && Validator.isEmpty(description.trim() || '')) {
    error.description = 'Description for recipe is required';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};


export const verifyReview = (req, res, next) => {
  const { content } = req.body;

  const error = {};

  if (!content) {
    error.content = 'Review canot be empty';
  }

  if (content && Validator.isEmpty(content.trim() || '')) {
    error.content = 'Please add a review';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};

export const verifyId = (req, res, next) => {
  const { recipeId } = req.params;

  const error = {};

  if (Number.isNaN(parseInt(recipeId, 10))) {
    error.recipeId = 'RecipeId must be a number';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};


export const verifyPageNumber = (req, res, next) => {
  const { page } = req.query;

  const error = {};

  if (page && Number.isNaN(parseInt(page, 10))) {
    error.page = 'Page number must be an integer';
  }

  if (isEmpty(error)) return next();
  return res.status(400).json({ error });
};
