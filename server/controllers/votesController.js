import db from '../models/index';


/**
 * @class votesController
 *
 * @export
 *
 */
export default class votesController {
  /**
   * @description - Upvote or downvote a recipe
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof votesController
   *
   * @returns {object} Class instance
   */
  static voteRecipe(req, res) {
    const voteQuery = req.query.vote;
    if (!voteQuery) {
      return res.status(400).json({ message: 'Vote query action is required' });
    }

    if ((voteQuery !== 'upvote') && (voteQuery !== 'downvote')) {
      return res.status(400)
        .json({
          message: 'Please provide the correct query action'
        });
    }

    return db.Recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(400)
            .json({
              status: 'fail',
              message: `No recipe with id ${req.params.recipeId} was found`
            });
        }

        return db.Vote.find({
          where: {
            recipeId: req.params.recipeId,
            userId: req.userId
          }
        })
          .then((foundVote) => {
            if (!foundVote) {
              db.Vote.create({
                recipeId: req.params.recipeId,
                userId: req.userId,
                [voteQuery]: 1
              });
              return res.status(201)
                .json({
                  status: 'success',
                  message: `Recipe ${voteQuery}d successfully.`,
                });
            }
            const queryAction = voteQuery === 'upvote' ? 'downvote' : 'upvote';

            if (foundVote[voteQuery] === 1) {
              return db.Vote.destroy({
                where: {
                  userId: req.userId,
                  recipeId: req.params.recipeId
                }
              })
                .then(() => res.status(200)
                  .json({
                    status: 'success',
                    message: `${voteQuery} removed successfully.`
                  }));
            } else if (foundVote[queryAction] === 1) {
              db.Vote.update({
                [queryAction]: 0,
                [voteQuery]: 1
              }, {
                where: {
                  userId: req.userId,
                  recipeId: req.params.recipeId
                }
              });
              return res.status(200)
                .json({
                  status: 'sucess',
                  message: `Recipe ${voteQuery}d successfully.`,
                });
            }
            return res.status(500)
              .json({
                status: 'error',
                message: 'Internal server error'
              });
          });
      });
  }
}
