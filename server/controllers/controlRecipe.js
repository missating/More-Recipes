import db from '../models/database';

/**
 *
 *
 * @class Recipe
 */
class Recipe {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} adds a recipe
   * @memberof Recipe
   */
  addRecipe(req, res) {
    const {
      ownerId, name, ingredients, description
    } = req.body;

    if (!ownerId) {
      return res.status(400)
        .send('Recipe should have an owner');
    }
    if (!name) {
      return res.status(400)
        .send('Recipe should have a name');
    }
    if (!ingredients) {
      return res.status(400)
        .send('Recipe should have ingredients');
    }
    if (!description) {
      return res.status(400)
        .send('Recipe should have directions to cook');
    }
    if (ingredients.trim().length < 1) {
      return res.status(400)
        .send('Ingredients are empty');
    }
    if (description.trim().length < 1) {
      return res.status(400)
        .send('Recipe should have a direction to cook');
    }
    const id = db.recipes.length + 1;
    const newRecipe = {
      id,
      ownerId,
      name,
      ingredients: [ingredients],
      description,
      downVote: 0,
      upVote: 0
    };
    db.recipes.push(newRecipe);
    return res.status(201)
      .json({
        status: 'success',
        message: 'Recipe added',
        recipe: newRecipe
      });
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} updates an existing recipe
   * @memberof Recipe
   */
  updateRecipe(req, res) {
    const query = req.params.recipeId;
    if (!query) {
      return res.status(400)
        .send('Recipe parameter is needed');
    }
    for (let i = 0; i < db.recipes.length; i += 1) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
        db.recipes[i].name = req.body.newName || db.recipes[i].name;
        db.recipes[i].ingredients = [req.body.newIngredients] || db.recipes[i].ingredients;
        db.recipes[i].description = req.body.newDescription || db.recipes[i].description;
        return res.status(200)
          .json({
            status: 'success',
            message: 'Recipe modified',
            recipe: db.recipes[i]
          });
      }
    }
    return res.status(404)
      .send(`recipe with id ${query} not found`);
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} after deleting a particular recipe
   * @memberof Recipe
   */
  deleteRecipe(req, res) {
    for (let i = 0; i < db.recipes.length; i += 1) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
        db.recipes.splice(i, 1);
        return res.status(200)
          .json({
            status: 'success',
            message: 'Recipe has been deleted'
          });
      }
    }
    return res.status(404)
      .send('Recipe not found');
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} the result from the api
   * @memberof Recipe
   */
  getAllRecipes(req, res) {
    if (req.query.sort) {
      const sorted = db.recipes.sort((a, b) => b.upVote - a.upVote);
      return res.status(200)
        .json({
          status: 'success',
          data: sorted
        });
    }
    return res.status(200)
      .json({
        status: 'success',
        recipes: db.recipes
      });
  }
}

export default Recipe;
