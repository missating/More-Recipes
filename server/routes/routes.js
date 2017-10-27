import * as Recipe from '../controllers/controlRecipe';
import * as Review from '../controllers/controlReview';


const recipe = new Recipe.default();
const review = new Review.default();


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/v1/recipes', recipe.addRecipe);
  app.put('/api/v1/recipes/:recipeId', recipe.updateRecipe);
  app.post('/api/v1/recipes/:recipeId/review', review.addReview);
  app.delete('/api/v1/recipes/:recipeId', recipe.deleteRecipe);
  app.get('/api/v1/recipes', recipe.getAllRecipes);
};

export default router;

