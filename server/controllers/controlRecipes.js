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
    const { name, ingredients, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Recipe name is empty' });
    }
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients field is empty' });
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
            description: req.body.description.toLowerCase(),
            upvote: req.body.upvote,
            downvote: req.body.downvote
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
      db.Recipe.findAll({
        include: [
          {
            model: db.Review,
            attributes: ['content']
          }
        ]
      })
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
              .json({ message: 'Currently no recipes' });
          }
        })
        .catch(error => res.status(500)
          .json({
            error,
          }));
    }
    if (req.query.sort) {
      db.Recipe.findAll({

        limit: 6,

        order: [['upvote', 'DESC']],
        include: [
          {
            model: db.Review, attributes: ['content']
          }
        ]
      })
        .then((recipes) => {
          if (recipes) {
            return res.status(200)
              .json({
                status: 'Success',
                recipes,
              });
          }
          if (!recipes) {
            return res.status(400)
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


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns { json } gets all recipes
 * @memberof Recipes
 */
  static getOneRecipe(req, res) {
    db.Recipe.findOne({
      where: {
        id: req.params.recipeId
      },
      include: [
        {
          model: db.Review,
          attributes: ['content'],
          include: [{
            model: db.User,
            attributes: ['fullname']
          }]
        }
      ]
    }).then((existing) => {
      if (!existing) {
        return res.status(404).send({
          status: 'Not found',
          message: 'A recipe with that Id is not found',
        });
      }
      if (existing) {
        return res.status(200)
          .json({
            status: 'Success',
            recipe: existing
          });
      }
    })
      .catch(() => res.status(500)
        .json({ message: 'server error' }));
  }


  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns { json } gets details of a user
 * @memberof Recipes
 */
  static getAllUserRecipes(req, res) {
    db.User.findOne({
      where: {
        id: req.userId
      }
    }).then((existing) => {
      if (!existing) {
        return res.status(404).send({
          status: 'Not found',
          message: 'no user with this id',
        });
      } db.Recipe.findAll({
        where: {
          userId: req.userId
        },
        include: [
          { model: db.Review, attributes: ['content'] }
        ]
      })
        .then((all) => {
          const userRecipes = all.length;
          if (userRecipes === 0) {
            return res.status(404)
              .json({ message: 'You currently have no recipes' });
          }
          return res.status(200)
            .json({
              status: 'Success',
              recipes: all
            });
        })
        .catch(() => res.status(500)
          .json({ message: 'Unable to find all recipes by you' }));
    });
  }
}
