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
              .then(() => res.status(201)
                .json({
                  status: 'Success',
                  message: 'Recipe added to favourites'
                }))
              .catch(() => res.status(500)
                .json({ message: 'Unable to add to favourites, server error' }));
          })
          .catch(() => res.status(500)
            .json({ messahe: 'a server error ocurred' }));
      })
      .catch(() => res.status(500)
        .json({ message: 'error, please try again later' }));
  }


  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} gets all favourite
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
        if (!found) {
          return res.status(404)
            .json({
              status: 'success',
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
        .json({ message: 'server error' }));
  }
}
