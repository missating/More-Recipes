import db from '../models/index';

const updateOneRecipeAttribute = (recipe) => {
  const recipeObj = recipe.get();

  recipeObj.upvote = 0;
  recipeObj.downvote = 0;

  recipeObj.Votes.forEach((vote) => {
    recipeObj.upvote += vote.upvote;
    recipeObj.downvote += vote.downvote;
  });
  delete recipeObj.Votes;
  return recipeObj;
};

const updateRecipeAttributes = arrayOfRecipes =>
  arrayOfRecipes.map(recipe => updateOneRecipeAttribute(recipe));

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
   * @param {object} req
   * @param {object} res
   * @returns {object} with the new recipe details
   * @memberof Recipes
   */
  static addRecipe(req, res) {
    const { name, ingredients, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Recipe field is empty' });
    }
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients field is empty' });
    }
    if (!description) {
      return res.status(400)
        .json({ message: 'Add description on how to prepare recipe' });
    }

    db.Recipe.findOne({
      where: {
        name: req.body.name,
        userId: req.userId
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          return res.status(409)
            .json({
              status: 'fail',
              message: 'You already have a recipe with this name'
            });
        }
        if (!foundRecipe) {
          db.Recipe.create({
            name: req.body.name,
            userId: req.userId,
            ingredients: req.body.ingredients,
            description: req.body.description,
            upvote: req.body.upvote,
            downvote: req.body.downvote
          })
            .then(newRecipe => res.status(201)
              .json({
                status: 'success',
                recipe: newRecipe
              }));
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }


  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with the updated recipe
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
            name: name || foundRecipe.name,
            ingredients: ingredients || foundRecipe.ingredients,
            description: description || foundRecipe.description
          };
          foundRecipe.update(update)
            .then(updatedRecipe => res.status(200)
              .json({
                status: 'success',
                message: 'Update successful',
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
              status: 'fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with a message for successful delete action
 * @memberof Recipes
 */
  static deleteRecipe(req, res) {
    if (typeof parseInt(req.params.recipeId, 10) !== 'number') {
      return res.status(400).json({ message: 'RecipeId must be a number' });
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
              status: 'fail',
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
                status: 'success',
                message: 'recipe deleted'
              }));
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with all recipes
 * @memberof Recipes
 */
  static getAllRecipes(req, res) {
    let { sort } = req.query;

    if (!sort) {
      db.Recipe.findAll({
        include: [
          {
            model: db.Review,
            attributes: ['content']
          },
          {
            model: db.Vote,
            attributes: ['upvote', 'downvote']
          }
        ]
      })
        .then((recipes) => {
          if (recipes) {
            return res.status(200)
              .json({
                status: 'Success',
                recipes: updateRecipeAttributes(recipes),
              });
          }
          if (!recipes) {
            return res.status(200)
              .json({
                status: 'success',
                message: 'Currently no recipes'
              });
          }
        })
        .catch(() => res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        }));
    }

    if (sort) {
      if (sort !== 'upvote' || sort !== 'downvote') {
        sort = 'upvote';
      }
      db.Vote.findAll({
        limit: 6,
        order: [['upvote', 'DESC']]
      }).then((votes) => {
        const recipeIds = votes.map(vote => vote.recipeId);

        db.Recipe.findAll({
          where: {
            id: {
              [db.Sequelize.Op.in]: recipeIds,
            }
          },
          include: [
            {
              model: db.Review, attributes: ['content']
            },
            {
              model: db.Vote,
              attributes: ['upvote', 'downvote']
            }
          ]
        }).then(recipes => res.json({ recipes }));
      })
        .catch(() => res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        }));
    }
  }


  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with one recipe
 * @memberof Recipes
 */
  static getOneRecipe(req, res) {
    if (typeof parseInt(req.params.recipeId, 10) !== 'number') {
      return res.status(400).json({ message: 'RecipeId must be a number' });
    }

    db.Recipe.findOne({
      where: {
        id: req.params.recipeId
      },
      include: [
        {
          model: db.Review,
          attributes: ['content', 'createdAt'],
          include: [{
            model: db.User,
            attributes: ['fullname']
          }]
        },
        {
          model: db.Vote,
          attributes: ['upvote', 'downvote']
        }
      ]
    }).then((existingRecipe) => {
      if (!existingRecipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'A recipe with that Id is not found',
        });
      }
      if (existingRecipe) {
        return res.status(200)
          .json({
            status: 'success',
            recipe: updateOneRecipeAttribute(existingRecipe)
          });
      }
    })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }


  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with all user recipes
 * @memberof Recipes
 */
  static getAllUserRecipes(req, res) {
    db.User.findOne({
      where: {
        id: req.userId
      }
    }).then((existingUser) => {
      if (!existingUser) {
        return res.status(404).send({
          status: 'fail',
          message: 'A user with that id is not found',
        });
      } db.Recipe.findAll({
        where: {
          userId: req.userId
        },
        include: [
          { model: db.Review, attributes: ['content'] },
          { model: db.Vote }
        ]
      })
        .then((allRecipes) => {
          const userRecipes = allRecipes.length;
          if (userRecipes === 0) {
            return res.status(200)
              .json({
                status: 'success',
                message: 'You currently have no recipes'
              });
          }
          return res.status(200)
            .json({
              status: 'success',
              recipes: allRecipes
            });
        })
        .catch(() => res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        }));
    });
  }
}
