import db from '../models/index';

const updateOneRecipeAttribute = (recipe) => {
  const recipeObj = recipe.get();

  recipeObj.upvote = 0;
  recipeObj.downvote = 0;

  recipeObj.Votes.forEach((vote) => {
    recipeObj.upvote += vote.upvote;
    recipeObj.downvote += vote.downvote;
  });
  Reflect.deleteProperty(recipeObj, 'Votes');
  return recipeObj;
};

const updateRecipeAttributes = arrayOfRecipes =>
  arrayOfRecipes.map(recipe => updateOneRecipeAttribute(recipe));

/**
 * This handles recipe creation, updating and deleting recipes
 * @export
 * @class Recipes
 */
export default class recipesController {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} with the new recipe details
   * @memberof Recipes
   */
  static addRecipe(req, res) {
    const {
      name, ingredients, description,
    } = req.body;

    let { recipeImage } = req.body;

    if (!recipeImage) {
      recipeImage = 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517914951/noImage_u3sry1.png';
    }

    db.Recipe.findOne({
      where: {
        name,
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
            name,
            userId: req.userId,
            ingredients,
            description,
            recipeImage
          })
            .then(newRecipe => res.status(201)
              .json({
                status: 'success',
                recipe: newRecipe
              }));
        }
      })
      .catch((err) => {
        console.log(err, 'err');
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      });
  }


  /**
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with the updated recipe
 * @memberof Recipes
 */
  static updateRecipe(req, res) {
    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'RecipeId must be a number' });
    }

    const {
      name, ingredients, description, recipeImage
    } = req.body;

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
            description: description || foundRecipe.description,
            recipeImage: recipeImage || foundRecipe.recipeImage
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
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with a message for successful delete action
 * @memberof Recipes
 */
  static deleteRecipe(req, res) {
    if (isNaN(parseInt(req.params.recipeId, 10))) {
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
            },
            cascade: true
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
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with all recipes
 * @memberof Recipes
 */
  static getAllRecipes(req, res) {
    let { sort } = req.query;

    if (!sort) {
      db.Recipe.findAndCountAll().then((all) => {
        const limit = 2;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        db.Recipe.findAll({
          limit,
          offset,
          order: [
            ['id', 'DESC']
          ],
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
                  NumberOfItems: numberOfItems,
                  Limit: limit,
                  Pages: pages,
                  CurrentPage: page,
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
      });
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
              [db.Sequelize.Op.in]: recipeIds
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
        }).then(recipes => res
          .json({ recipes: updateRecipeAttributes(recipes) }));
      })
        .catch(() => res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        }));
    }
  }


  /**
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {object} with one recipe
 * @memberof Recipes
 */
  static getOneRecipe(req, res) {
    if (isNaN(parseInt(req.params.recipeId, 10))) {
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
            attributes: ['fullname', 'email']
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
            return res.status(404)
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
