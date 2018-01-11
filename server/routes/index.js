import User from '../controllers/usersController';
import Recipe from '../controllers/recipesController';
import Review from '../controllers/reviewsController';
import Vote from '../controllers/votesController';
import Favourite from '../controllers/favouritesControllers';
import getToken from '../middlewares/getToken';
import verifyToken from '../middlewares/verifyToken';


const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });

  // create a user
  app.post('/api/v1/users/signup', User.createUser);

  // user signs in
  app.post('/api/v1/users/signin', User.userLogin);

  // an auth user can view his/her profile
  app.get(
    '/api/v1/users/profile',
    getToken, verifyToken, User.getUserProfile
  );

  // auth user can update their profile
  app.put(
    '/api/v1/users/profile',
    getToken, verifyToken, User.updateUserProfile
  );

  // user adds recipe
  app.post(
    '/api/v1/recipes',
    getToken, verifyToken, Recipe.addRecipe
  );

  // user updates recipe
  app.put(
    '/api/v1/recipes/:recipeId',
    getToken, verifyToken, Recipe.updateRecipe
  );

  // user delete recipe
  app.delete(
    '/api/v1/recipes/:recipeId',
    getToken, verifyToken, Recipe.deleteRecipe
  );

  // user adds review for a recipe
  app.post(
    '/api/v1/recipes/:recipeId/review',
    getToken, verifyToken, Review.addReview
  );

  // user can get all their recipe
  app.get(
    '/api/v1/recipes/user/allrecipes',
    getToken, verifyToken, Recipe.getAllUserRecipes
  );

  // anybody can view all recipe
  app.get('/api/v1/recipes', Recipe.getAllRecipes);

  // anybody can view one recipe
  app.get('/api/v1/recipes/:recipeId', Recipe.getOneRecipe);

  // user can add recipe as fav
  app.post(
    '/api/v1/users/:recipeId/favourite',
    getToken, verifyToken, Favourite.addFavourite
  );

  // user can get all fav recipe
  app.get(
    '/api/v1/users/favourites',
    getToken, verifyToken, Favourite.getAllFavourites
  );

  // user can vote a recipe with the right query parameter
  app.post(
    '/api/v1/recipes/:recipeId/vote',
    getToken, verifyToken, Vote.voteRecipe
  );
};

export default routes;
