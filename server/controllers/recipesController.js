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
 * @class recipesController
 *
 * @export
 *
 */
export default class recipesController {
  /**
   * @description - Add a new recipe
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof recipesController
   *
   * @returns {object} Class instance
   */
  static addRecipe(req, res) {
    const {
      name, ingredients, description,
    } = req.body;

    let { recipeImage } = req.body;

    if (!recipeImage) {
      // eslint-disable-next-line
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
                message: 'Recipe created successfully',
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
   * @description - Update a recipe
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof recipesController
   *
   * @returns {object} Class instance
   */
  static updateRecipe(req, res) {
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
   * @description - Delete a recipe
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof recipesController
   *
   * @returns {object} Class instance
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
    * @description - Get all recipes with the highest number of votes or not
    * @static
    *
    * @param {object} req - HTTP Request
    * @param {object} res - HTTP Response
    *
    * @memberof recipesController
    *
    * @returns {object} Class instance
    */
  static getAllRecipes(req, res) {
    let { sort } = req.query;

    if (!sort) {
      db.Recipe.findAndCountAll().then((all) => {
        const limit = 6;
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
                  status: 'success',
                  numberOfItems,
                  limit,
                  pages,
                  currentPage: page,
                  recipes: updateRecipeAttributes(recipes),
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
   * @description - Get one recipe
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof recipesController
   *
   * @returns {object} Class instance
   */
  static getOneRecipe(req, res) {
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
   * @description - Get all recipes by a particular user
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof recipesController
   *
   * @returns {object} Class instance
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
      } db.Recipe.findAndCountAll({
        where: {
          userId: req.userId
        }
      }).then((all) => {
        const limit = 6;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        db.Recipe.findAll({
          where: {
            userId: req.userId
          },
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
        }).then(allRecipes => res.status(200)
          .json({
            status: 'success',
            numberOfItems,
            limit,
            pages,
            currentPage: page,
            recipes: allRecipes
          }))
          .catch(() => res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          }));
      });
    });
  }


  /**
   * @description - Search for recipes by name or ingredients
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof recipesController
   *
   * @returns {object} Class instance
   */
  static searchRecipes(req, res) {
    const { search } = req.query;

    db.Recipe.findAndCountAll({
      where: {
        $or: [
          { name: { $ilike: `%${search}%` } },
          { ingredients: { $ilike: `%${search}%` } }
        ],
      }
    })
      .then((all) => {
        const limit = 6;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        db.Recipe.findAll({
          where: {
            $or: [
              { name: { $ilike: `%${search}%` } },
              { ingredients: { $ilike: `%${search}%` } }
            ],
          },
          include: [
            {
              model: db.Review,
              attributes: ['content']
            },
            {
              model: db.Vote,
              attributes: ['upvote', 'downvote']
            }
          ],
          limit,
          offset,
          order: [
            ['id', 'ASC']
          ],
        })
          .then((foundRecipe) => {
            if (foundRecipe.length < 1) {
              return res.status(200)
                .json({
                  status: 'success',
                  recipes: foundRecipe
                });
            }
            return res.status(200)
              .json({
                status: 'success',
                numberOfItems,
                pages,
                currentPage: page,
                limit,
                recipes: foundRecipe
              });
          });
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}
