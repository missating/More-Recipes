import User from '../controllers/controlUsers';
import Recipe from '../controllers/controlRecipes';
import Review from '../controllers/controlReview';
import Vote from '../controllers/controlVote';
import Favourite from '../controllers/controlFavourite';
import extractToken from '../middlewares/authenticateUser';
import verifyToken from '../middlewares/allowUser';


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/v1/users/signup', User.createUser); // create a user
  app.post('/api/v1/users/signin', User.userLogin); // user signs in
  app.get('/api/v1/users/profile', extractToken, verifyToken, User.getUserProfile); // an auth user can view his/her profile
  app.put('/api/v1/users/profile', extractToken, verifyToken, User.updateUserProfile); // auth user can update their profile
  app.post('/api/v1/recipes', extractToken, verifyToken, Recipe.addRecipe); // user adds recipe
  app.put('/api/v1/recipes/:recipeId', extractToken, verifyToken, Recipe.updateRecipe); // user updates recipe
  app.delete('/api/v1/recipes/:recipeId', extractToken, verifyToken, Recipe.deleteRecipe); // user delete recipe
  app.post('/api/v1/recipes/:recipeId/reviews', extractToken, verifyToken, Review.addReview); // user adds review for a recipe
  app.get('/api/v1/recipes/user/allrecipes', extractToken, verifyToken, Recipe.getAllUserRecipes); // user can get all their recipe
  app.get('/api/v1/recipes', Recipe.getAllRecipes); // anybody can view all recipe
  app.get('/api/v1/recipes/:recipeId', Recipe.getOneRecipe); // anybody can view one recipe
  app.post('/api/v1/users/:recipeId/favourite', extractToken, verifyToken, Favourite.addFavourite); // user can add recipe as fav
  app.get('/api/v1/users/favourites', extractToken, verifyToken, Favourite.getAllFavourites); // user can get all fav recipe
  app.post('/api/v1/recipes/:recipeId/upvote', extractToken, verifyToken, Vote.upvote); // user can upvote a recipe
  app.post('/api/v1/recipes/:recipeId/downvote', extractToken, verifyToken, Vote.downVote); // user can downvote a recipe
};

export default router;
