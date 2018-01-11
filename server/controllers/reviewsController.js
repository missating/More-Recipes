import db from '../models/index';


/**
 *
 *
 * @export
 * @class Review
 */
export default class Review {
  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} with the review for a particular recipe
   * @memberof Review
   */
  static addReview(req, res) {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Please add a review' });
    }

    db.Recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'fail',
              message: `No recipe with id ${req.params.recipeId}`
            });
        }
        if (foundRecipe) {
          const newReview = {
            content,
            userId: req.userId,
            recipeId: req.params.recipeId
          };
          db.Review.create(newReview)
            .then(createdReview => res.status(201)
              .json({
                status: 'Success',
                review: createdReview
              }));
        }
      })
      .catch(() => res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}
