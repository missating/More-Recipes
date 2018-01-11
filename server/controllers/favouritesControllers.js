import db from '../models/index';


/**
 *
 *
 * @export
 * @class Favourite
 */
export default class Favourite {
  /**
   *
   *
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} with recipe added as favourite
   * @memberof Favourite
   */
  static addFavourite(req, res) {
    if (typeof parseInt(req.params.recipeId, 10) !== 'number') {
      return res.status(400).json({ message: 'RecipeId must be a number' });
    }

    db.Recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'fail',
              message: 'recipe does not exist in catalogue'
            });
        }

        db.Favourite.findOne({
          where: {
            recipeId: req.params.recipeId,
            userId: req.userId
          }
        })
          .then((foundFavourite) => {
            if (foundFavourite) {
              return res.status(403)
                .json({
                  status: 'fail',
                  message: 'Already added this recipe to your favourites'
                });
            }
            db.Favourite.create({
              userId: req.userId,
              recipeId: req.params.recipeId
            })
              .then(() => {
                foundRecipe.increment(
                  'favourite',
                  { where: { id: req.params.recipeId } }
                );
                return res.status(201).json({
                  status: 'success',
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
 *
 *
 * @static
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with all favourite recipes for a user
 * @memberof Favourite
 */
  static getAllFavourites(req, res) {
    db.Favourite.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: db.Recipe, attributes: ['name', 'ingredients', 'description']
        }
      ]
    })
      .then((found) => {
        const userFavs = found.length;
        if (userFavs === 0) {
          return res.status(404)
            .json({
              status: 'fail',
              message: 'You have no recipes added as favourites'
            });
        }
        if (found) {
          return res.status(200)
            .json({
              status: 'Success',
              favourites: found
            });
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}
