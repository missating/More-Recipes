import * as Recipe from '../controllers/controlRecipe';
import * as Review from '../controllers/controlReview';
import * as Upvote from '../controllers/controlUpVote';


const recipe = new Recipe.default();
const review = new Review.default();
const upvote = new Upvote.default();


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/recipes', recipe.addRecipe);
  app.put('/api/recipes/:recipeId', recipe.updateRecipe);
  app.delete('/api/recipes/:recipeId', recipe.deleteRecipe);
  app.get('/api/recipes', recipe.getAllRecipes);
  app.post('/api/recipes/:recipeId/review', review.addReview);
  app.get('/api/recipes?sort=up&order=des', upvote.getUpvotes);
};

export default router;

