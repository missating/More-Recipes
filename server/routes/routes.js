import User from '../controllers/controlUsers';
import Recipe from '../controllers/controlRecipes';
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
  app.get('/api/recipes', Recipe.getAllRecipes);
};

export default router;

