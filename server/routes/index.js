import User from '../controllers/usersController';
import Recipe from '../controllers/recipesController';
import Review from '../controllers/reviewsController';
import Vote from '../controllers/votesController';
import Favourite from '../controllers/favouritesController';
import {
  verifyToken,
  verifySignup,
  verifySignin,
  verifyNewRecipe
} from '../middleware/validation';


const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });

  // create a user
  app.post('/api/v1/users/signup', verifySignup, User.createUser);

  // user signs in
  app.post('/api/v1/users/signin', verifySignin, User.userLogin);

  // auth user can view their profile
  // auth user can update their profile
  app.route('/api/v1/users/profile')
    .get(verifyToken, User.getUserProfile)
    .put(verifyToken, User.updateUserProfile);

  // anybody can view all recipe
  // user adds recipe
  app.route('/api/v1/recipes')
    .post(verifyToken, verifyNewRecipe, Recipe.addRecipe)
    .get(Recipe.getAllRecipes);

  // auth user can delete their recipe
  // auth user can edit their recipe
  // anybody can view a recipe
  app.route('/api/v1/recipes/:recipeId')
    .put(verifyToken, Recipe.updateRecipe)
    .delete(verifyToken, Recipe.deleteRecipe)
    .get(Recipe.getOneRecipe);

  // user adds review for a recipe
  app.post(
    '/api/v1/recipes/:recipeId/review',
    verifyToken, Review.addReview
  );

  // user can get all their recipe
  app.get(
    '/api/v1/recipes/user/allrecipes',
    verifyToken, Recipe.getAllUserRecipes
  );


  // user can add recipe as favourite
  app.post(
    '/api/v1/users/:recipeId/favourite',
    verifyToken, Favourite.addFavourite
  );

  // user can get all fav recipe
  app.get(
    '/api/v1/users/favourites',
    verifyToken, Favourite.getAllFavourites
  );

  // user can vote a recipe with the right query parameter
  app.post(
    '/api/v1/recipes/:recipeId/vote',
    verifyToken, Vote.voteRecipe
  );
};

export default routes;
