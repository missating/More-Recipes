import * as Recipe from '../controllers/controlRecipe';


const recipe = new Recipe.default();


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/recipes', recipe.addRecipe);
  app.put('/api/recipes/:recipeId', recipe.updateRecipe);
  app.delete('/api/recipes/:recipeId', recipe.deleteRecipe);
};

export default router;

