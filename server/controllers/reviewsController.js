import db from '../models/index';


/**
 * This handles adding a review for a recipe
 * @export
 * @class Review
 */
export default class reviewsController {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} with the review for a particular recipe
   * @memberof Review
   */
  static addReview(req, res) {
    const { content } = req.body;

    if (isNaN(parseInt(req.params.recipeId, 10))) {
      return res.status(400).json({ message: 'RecipeId must be a number' });
    }

    if (!content) {
      return res.status(400).json({ message: 'Please add a review' });
    }

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
              status: 'Success',
              review
            })));
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      });
  }
}
