import db from '../models/database';

/**
 *
 *
 * @class Upvote
 */
class Upvote {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {josn} the recipe with the most upvote
   * @memberof Upvote
   */
  getUpvotes(req, res) {
    const compareFunct = ((a, b) => b.upVote - a.upVote);
    const up = [db.recipes.sort(compareFunct)];
    res.status(200)
      .send(up);
    return this;
  }
}

export default Upvote;
