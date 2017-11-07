import User from '../controllers/controlUsers';
import Recipe from '../controllers/controlRecipes';
import Review from '../controllers/controlReview';
import Vote from '../controllers/controlVote';
import extractToken from '../middlewares/authenticateUser';
import verifyToken from '../middlewares/allowUser';


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/v1/users/signup', User.createUser); // create a user
  app.post('/api/v1/users/signin', User.userLogin); // user signs in
  app.post('/api/v1/recipes', extractToken, verifyToken, Recipe.addRecipe); // add recipes
  app.put('/api/v1/recipes/:recipeId', extractToken, verifyToken, Recipe.updateRecipe); // update recipes
  app.delete('/api/v1/recipes/:recipeId', extractToken, verifyToken, Recipe.deleteRecipe);
  app.post('/api/v1/recipes/:recipeId/reviews', extractToken, verifyToken, Review.addReview);
  app.post('/api/v1/users/:userId/favourite', extractToken, verifyToken, User.addFavourite);
  app.get('/api/v1/users/:userId/recipes', extractToken, verifyToken, User.getAllFavourite);
  app.get('/api/v1/recipes/user/allrecipes', extractToken, verifyToken, Recipe.getAllUserRecipes);
  app.get('/api/v1/recipes', Recipe.getAllRecipes);
  app.post('/api/v1/recipes/:recipeId/upvote', extractToken, verifyToken, Vote.upvote); // user can upvote recipe
  app.post('/api/v1/recipes/:recipeId/downvote', extractToken, verifyToken, Vote.downVote); // user can downvote recipe
};

export default router;

