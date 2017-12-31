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
   * @param {any} req
   * @param {any} res
   * @returns {json} add recipe to favourite
   * @memberof Favourite
   */
  static addFavourite(req, res) {
    db.Recipe.findById(req.params.recipeId)
      .then((found) => {
        if (!found) {
          return res.status(404)
            .json({ message: 'recipe does not exist in catalogue' });
        }

        db.Favourite.findOne({
          where: {
            recipeId: req.params.recipeId,
            $and: { userId: req.userId }
          }
        })
          .then((foundRecipe) => {
            if (foundRecipe) {
              return res.status(403)
                .json({
                  status: 'Fail',
                  message: 'Already added this recipe to your favourites'
                });
            }
            db.Favourite.create({
              userId: req.userId,
              recipeId: req.params.recipeId
            })
              .then(() => {
                db.Recipe.findById(req.params.recipeId).then(() => {
                  if (found) {
                    found.increment('favourite', { where: { id: req.params.recipeId } });
                    return res.status(200).json({ message: 'recipe favourited' });
                  }
                  if (!found) {
                    return res.status(500).json({ message: 'Cannot find recipe to favourite' });
                  }
                }).catch(error =>
                  res.status(500).json({ message: error }));
              });
          }).catch(() => res.status(500)
            .json({ message: 'error, please try again later' }));
      });
  }

  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {json} all favourite recipes for a user
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
              status: 'Not found',
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
      .catch(() => res.status(500)
        .json({ message: 'error, please try again later' }));
  }
}
