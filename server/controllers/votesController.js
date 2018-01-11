import 'babel-core/register';
import 'babel-polyfill';
import db from '../models/index';


/**
 *
 *
 * @export
 * @class Vote
 */
export default class Vote {
  /**
   *
   *
   * @static
   * @param {obj} req
   * @param {obj} res
   * @returns {obj} with a successful message and recipe with the vote
   * @memberof Vote
   */
  static async voteRecipe(req, res) {
    const voteQuery = req.query.vote;
    if (!voteQuery) {
      return res.status(400).json({ message: 'Action is required.' });
    }

    const { userId } = req;
    const { recipeId } = req.params;

    const foundRecipe = await db.Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404)
        .json({
          status: 'fail',
          message: 'Recipe not found.'
        });
    }

    const vote = await db.Vote.find({ where: { userId, recipeId } });

    if (!vote) {
      const createdVote = await
        db.Vote.create({ recipeId, userId, [voteQuery]: 1 });

      return res.status(201)
        .json({
          status: 'success',
          message: `Recipe ${voteQuery}d successfully.`,
          vote: createdVote
        });
    }

    const queryAction = voteQuery === 'upvote' ? 'downvote' : 'upvote';

    if (vote[voteQuery] === 1) {
      await vote.destroy();

      return res.status(200)
        .json({
          status: 'success',
          message: `${voteQuery} removed successfully.`
        });
    } else if (vote[queryAction] === 1) {
      const updatedVote = await vote
        .update({ [queryAction]: 0, [voteQuery]: 1 });

      return res.status(201)
        .json({
          status: 'success',
          message: `Recipe ${voteQuery}d successfully.`,
          vote: updatedVote
        });
    }
  }
}
