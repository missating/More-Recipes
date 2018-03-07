import db from '../models/index';


/**
 * @class favouritesController
 *
 * @export
 *
 */
export default class favouritesController {
  /**
   * @description - Add a recipe as favourite
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof favouritesController
   *
   * @returns {object} Class instance
   */
  static addFavourite(req, res) {
    return db.Recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'fail',
              message: 'recipe does not exist in catalogue'
            });
        }

        return db.Favourite.findOne({
          where: {
            recipeId: req.params.recipeId,
            userId: req.userId
          }
        })
          .then((foundFavourite) => {
            if (foundFavourite) {
              return db.Favourite.destroy({
                where: {
                  userId: req.userId,
                  recipeId: req.params.recipeId
                }
              })
                .then(() => {
                  foundRecipe.decrement(
                    'favourite',
                    { where: { id: req.params.recipeId } }
                  );
                  return res.status(200)
                    .json({
                      status: 'removed',
                      message: 'Recipe removed from favourite'
                    });
                });
            }
            return db.Favourite.create({
              userId: req.userId,
              recipeId: req.params.recipeId
            })
              .then(() => {
                foundRecipe.increment(
                  'favourite',
                  { where: { id: req.params.recipeId } }
                );
                return res.status(200).json({
                  status: 'added',
                  message: 'recipe favourited',
                  addedFavourite: foundRecipe
                });
              });
          })
          .catch(() => res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          }));
      });
  }


  /**
   * @description Gets a user's favourites
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof favouriteController
   *
   * @returns {object} Class instance
   */
  static getAllFavourites(req, res) {
    return db.Favourite.findAndCountAll({
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
      db.Favourite.findAll({
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
            model: db.Recipe,
            attributes: ['name', 'ingredients', 'description', 'recipeImage']
          }
        ]
      })
        .then(found => res.status(200)
          .json({
            status: 'success',
            numberOfItems,
            limit,
            pages,
            currentPage: page,
            favourites: found
          }))
        .catch(() => res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        }));
    });
  }
}
