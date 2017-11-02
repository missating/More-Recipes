import User from '../controllers/controlUsers';
import Recipe from '../controllers/controlRecipes';
import Review from '../controllers/controlReview';
import extractToken from '../middlewares/authenticateUser';
import verifyToken from '../middlewares/allowUser';


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/users/signup', User.createUser);
  app.post('/api/users/signin', User.userLogin);
  app.post('/api/recipes', extractToken, verifyToken, Recipe.addRecipe);
  app.put('/api/recipes/:recipeId', extractToken, verifyToken, Recipe.updateRecipe);
  app.delete('/api/recipes/:recipeId', extractToken, verifyToken, Recipe.deleteRecipe);
  app.post('/api/recipes/:recipeId/reviews', extractToken, verifyToken, Review.addReview);
  app.post('/api/users/:userid/favourite', User.addFavourite);
  app.get('/api/users/:userid/recipes', User.getAllFavourite);
  app.get('/api/recipes/:recipeId', Recipe.viewOne);
  app.get('/api/recipes/user/all', extractToken, verifyToken, Recipe.getAllUser);
  app.get('/api/recipes', Recipe.getAllRecipes);
};

export default router;

