import db from '../models/index';
import "babel-core/register";
import "babel-polyfill";

/**
 *
 *
 * @export
 * @class Vote
 */
export default class Vote {

  static async upvoteRecipe(req, res) {
    const { userId } = req;
    const { recipeId } = req.params;

    const foundRecipe = await db.Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404).json({
        message: 'Recipe not found.'
      });
    }

    const vote = await db.Vote.find({ where: { userId, recipeId } });
    console.log('vote is : ', vote, { userId, recipeId });

    if (!vote) {
      const createdVote = await db.Vote.create({ recipeId, userId, upvote: 1 });

      return res.status(201).json({
        message: 'Recipe upvoted successfully.',
        vote: createdVote
      }); 
    }

    // if user has downvoted, or user has already upvoted
    if (vote.upvote === 1) {
      await vote.destroy();

      return res.status(201).json({
        message: 'Upvote removed successfully.'
      }); 
    } else if (vote.downvote === 1) {
      const updatedVote = await vote.update({ downvote: 0, upvote: 1 });

      return res.status(201).json({
        message: 'Recipe upvoted successfully.',
        vote: updatedVote
      });
    }

  }

  static async voteRecipe(req, res) {
    const action = req.query.vote; 
    const { userId } = req;
    const { recipeId } = req.params;

    const foundRecipe = await db.Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404).json({
        message: 'Recipe not found.'
      });
    }

    const vote = await db.Vote.find({ where: { userId, recipeId } });

    if (!vote) {
      const createdVote = await db.Vote.create({ recipeId, userId, [action] : 1 });

      return res.status(201).json({
        message: `Recipe ${action}d successfully.`,
        vote: createdVote
      });
    }

    const otherAction = action === 'upvote' ? 'downvote' : 'upvote';

    if (vote[action] === 1) {
      await vote.destroy();

      return res.status(201).json({
        message: `${action} removed successfully.`
      }); 
    } else if (vote[otherAction] === 1) {
      const updatedVote = await vote.update({ [otherAction] : 0, [action] : 1 });

      return res.status(201).json({
        message: `Recipe ${action}d successfully.`,
        vote: updatedVote
      });
    }

    
  }

  static async downvoteRecipe(req, res) {
    const { userId } = req;
    const { recipeId } = req.params;

    const foundRecipe = await db.Recipe.findById(recipeId);

    if (!foundRecipe) {
      return res.status(404).json({
        message: 'Recipe not found.'
      });
    }

    const vote = await db.Vote.find({ where: { userId, recipeId } });
    console.log('vote is : ', vote, { userId, recipeId });

    if (!vote) {
      const createdVote = await db.Vote.create({ recipeId, userId, downvote: 1 });

      return res.status(201).json({
        message: 'Recipe downvoted successfully.',
        vote: createdVote
      });
    }

    // if user has downvoted, or user has already upvoted
    if (vote.downvote === 1) {
      await vote.destroy();

      return res.status(201).json({
        message: 'downvote removed successfully.'
      }); 
    } else if (vote.upvote === 1) {
      const updatedVote = await vote.update({ upvote: 0, downvote: 1 });

      return res.status(201).json({
        message: 'Recipe downvoted successfully.',
        vote: updatedVote
      });
    }

  }
}
