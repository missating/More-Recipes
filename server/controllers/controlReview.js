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
   * @param {any} req
   * @param {any} res
   * @returns { json } review for recipe
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
            .json({ message: `No recipe with id ${req.params.recipeId}` });
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
              }))
            .catch(error => res.status(500)
              .json({
                status: 'Fail. Unable to add review',
                error
              }));
        }
      });
  }
}
