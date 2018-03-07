import db from '../models/index';


/**
 * @class reviewsController
 *
 * @export
 *
 */
export default class reviewsController {
  /**
   * @description - Add a review to a recipe
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof reviewsController
   *
   * @returns {object} Class instance
   */
  static addReview(req, res) {
    const { content } = req.body;

    return db.Recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'fail',
              message: `No recipe with id ${req.params.recipeId} was found`
            });
        }
        const newReview = {
          content,
          userId: req.userId,
          recipeId: req.params.recipeId
        };
        return db.Review.create(newReview)
          .then(createdReview => db.Review.findById(createdReview.id, {
            include: [{
              model: db.User, attributes: ['fullname', 'email']
            }]
          }).then(review => res.status(201)
            .json({
              status: 'success',
              review
            })));
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}
