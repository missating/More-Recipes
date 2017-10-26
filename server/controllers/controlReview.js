import db from '../models/database';

/**
 *
 *
 * @class Review
 */
class Review {
  /**
     *
     *
     * @param {any} req
     * @param {any} res
     * @returns {json} adds a recipe
     * @memberof Review
     */
  addReview(req, res) {
    const { reviewer } = req.body.reviewer;
    const { content } = req.body.content;
    const recipe = req.params.recipeId;
    if (!content) {
      return res.status(400)
        .send('Review should have a content');
    }
    if (content.trim().length < 1) {
      return res.status(400)
        .send('Review is empty');
    }
    if (!recipe || !reviewer) {
      return res.status(400)
        .send('Please use a valid recipeId');
    }
    const newId = db.reviews.length + 1;
    const newReview = {
      reviewId: newId,
      ownerId: reviewer,
      content
    };
    db.reviews.push(newReview);
    return res.status(201)
      .json({
        status: 'success',
        message: 'Review added',
        review: newReview
      });
  }
}


export default Review;
