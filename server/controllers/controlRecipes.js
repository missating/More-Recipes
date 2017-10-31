import db from '../models/index';


/**
 *
 *
 * @export
 * @class Recipes
 */
export default class Recipes {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {json} adds a recipe
   * @memberof Recipes
   */
  static addRecipe(req, res) {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const description = req.body.description;

    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients field is empty' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Recipe name is empty' });
    }
    if (name.length < 5) {
      return res.status(400).json({ message: 'Recipe name should be at least 6 characters' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Add directions to prepare recipe' });
    }

    db.Recipe.findOne({
      where: {
        name: req.body.name.toLowerCase(),
        userId: req.userId
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          return res.status(403)
            .json({
              status: 'Fail',
              message: 'You already have a recipe with this name'
            });
        }
        if (!foundRecipe) {
          db.Recipe.create({
            name: req.body.name.toLowerCase(),
            userId: req.userId,
            ingredients: req.body.ingredients.toLowerCase(),
            description: req.body.description.toLowerCase()
          })
            .then(newRecipe => res.status(201)
              .json({
                status: 'success',
                recipe: newRecipe
              }));
        }
      }).catch(error => res.status(400).send(error.message));
  }


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {json} updates a recipe
 * @memberof Recipes
 */
  static updateRecipe(req, res) {
    const { name, ingredients, description } = req.body;


    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to update' });
    }


    db.Recipe.findOne({
      where: {
        id: req.params.recipeId,
        userId: req.userId
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          const update = {
            name: name ? name.toLowerCase() : foundRecipe.name,
            ingredients: ingredients ? ingredients.toLowerCase() : foundRecipe.ingredients,
            description: description ? description.toLowerCase() : foundRecipe.description
          };
          foundRecipe.update(update)
            .then(updatedRecipe => res.status(200)
              .json({
                status: 'Update successful',
                recipe: updatedRecipe
              }))
            .catch(error => res.status(500)
              .json({
                status: 'Fail',
                message: error
              }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(error => res.status(500)
        .json({
          status: 'Fail',
          error,
        }));
  }

  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns { json } deletes a recipe
 * @memberof Recipes
 */
  static deleteRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to delete' });
    }

    db.Recipe.findOne({
      where: {
        id: req.params.recipeId,
        userId: req.userId
      }
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
        if (foundRecipe) {
          db.Recipe.destroy({
            where: {
              id: req.params.recipeId,
              userId: req.userId
            }
          })
            .then(() => res.status(200)
              .json({
                status: 'Success',
                message: 'recipe deleted'
              }))
            .catch(error => res.status(500)
              .json({ message: error }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(error => res.status(500)
        .json({
          status: 'Fail',
          error,
        }));
  }

  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns { json } gets all recipes
 * @memberof Recipes
 */
  static getAllRecipes(req, res) {
    if (!req.query.sort) {
      db.Recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            return res.status(200)
              .json({
                status: 'Success',
                recipes,
              });
          }
          if (!recipes) {
            return res.status(404)
              .json({ message: 'No recipes found' });
          }
        })
        .catch(error => res.status(500)
          .json({
            error,
          }));
    }
    if (req.query.sort) {
      db.Recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            const sorted = recipes.sort((a, b) => b.upvote - a.upvote);
            return res.status(200)
              .json({
                status: 'Success',
                sorted,
              });
          }
          if (!recipes) {
            return res.status(200)
              .json({ message: 'Currently no recipes' });
          }
        })
        .catch(error => res.status(500)
          .json({
            status: 'Fail',
            error,
          }));
    }
  }
}
