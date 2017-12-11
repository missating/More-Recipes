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
   * @param {any} req
   * @param {any} res
   * @returns {json} status code and message
   * @memberof Vote
   */
  static upvote(req, res) {
    db.Recipe.findById(req.params.recipeId).then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).json({ message: 'recipe with that Id not found' });
      }
      if (foundRecipe) {
        db.Upvote.findOne({
          where: {
            userId: req.userId,
            recipeId: req.params.recipeId
          },
          attributes: ['id', 'recipeId', 'userId']
        }).then((foundUpvote) => {
          if (!foundUpvote) {
            // find if recipe has been downvoted by same user
            db.Downvote.findOne({
              where: {
                recipeId: req.params.recipeId,
                userId: req.userId
              },
              attributes: ['id', 'recipeId', 'userId']
            }).then((foundDownvote) => {
              // if recipe has not been downvoted by user, create upvote, increment recipe's
              if (!foundDownvote) {
                // create upvote
                const newUpvote = {
                  recipeId: req.params.recipeId,
                  userId: req.userId
                };
                db.Upvote.create(newUpvote).then(() => {
                  db.Recipe.findById(req.params.recipeId).then((found) => {
                    if (!found) {
                      return res.status(500).json({ message: 'could not upvote recipe' });
                    }
                    if (found) {
                      found.increment('upvote', { where: { id: req.params.recipeId } });
                      return res.status(200).json({ message: 'upvote success' });
                    }
                  }).catch(error =>
                    // can't increment recipe value
                    res.status(500).json({ message: error }));
                }).catch(error =>
                  // can't create upvote
                  res.status(500).json({ message: error }));
              }
              if (foundDownvote) {
                db.Downvote.destroy({
                  where: {
                    recipeId: req.params.recipeId,
                    userId: req.userId
                  }
                }).then(() => {
                  // after destroying downvote, create upvote, increment recipe's upvote
                  const newUpvote = {
                    recipeId: req.params.recipeId,
                    userId: req.userId
                  };
                  db.Upvote.create(newUpvote).then(() => {
                    db.Recipe.findById(req.params.recipeId).then((found) => {
                      if (found) {
                        found.increment('upvote', { where: { id: req.params.recipeId } });
                        found.increment('downvote', { where: { id: req.params.recipeId } });
                        return res.status(200).json({ message: 'recipe upvoted' });
                      }
                      if (!found) {
                        return res.status(500).json({ message: 'Cannot find recipe to increment' });
                      }
                    }).catch(error =>
                      // can't find recipe after destroying downvote
                      res.status(500).json({ message: error }));
                  }).catch(error =>
                    // can't create upvote after destroying in downvote
                    res.status(500).json({ message: error }));
                }).catch(error =>
                  // couldn't destroy in downvote
                  res.status(500).json({ message: error }));
              }
            }).catch(error =>
              // can't find in downvote
              res.status(500).json({ message: error }));
          }
          if (foundUpvote) {
            return res.status(403).json({ message: 'You already upvoted this recipe' });
          }
        }).catch(error =>
          // can't find recipe in upvote
          res.status(500).json({ message: error }));
      }
    }).catch(error =>
      // can't find recipe
      res.status(500).json({ message: error }));
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {json} status code and message
   * @memberof Vote
   */
  static downVote(req, res) {
    db.Recipe.findById(req.params.recipeId).then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).json({ message: 'recipe with that Id not found' });
      }
      if (foundRecipe) {
        db.Downvote.findOne({
          where: {
            userId: req.userId,
            recipeId: req.params.recipeId
          },
          attributes: ['id', 'recipeId', 'userId']
        }).then((foundDownvote) => {
          if (!foundDownvote) {
            // find if recipe has been upvoted by user
            db.Upvote.findOne({
              where: {
                recipeId: req.params.recipeId,
                userId: req.userId
              },
              attributes: ['id', 'recipeId', 'userId']
            }).then((foundUpvote) => {
              // if recipe has not been upvoted by user
              if (!foundUpvote) {
                // create new downvote
                const newDownvote = {
                  recipeId: req.params.recipeId,
                  userId: req.userId
                };
                db.Downvote.create(newDownvote).then(() => {
                  db.Recipe.findById(req.params.recipeId).then((found) => {
                    if (!found) {
                      return res.status(500).json({ message: 'could not upvote recipe' });
                    }
                    if (found) {
                      found.increment('downvote', { where: { id: req.params.recipeId } });
                      return res.status(200).json({ message: 'downvote success' });
                    }
                  }).catch(error =>
                    // can't find recipe after creating downvote
                    res.status(500).json({ message: error }));
                }).catch(error =>
                  // can't create new new downvote
                  res.status(500).json({ message: error }));
              }
              if (foundUpvote) {
                db.Upvote.destroy({
                  where: {
                    recipeId: req.params.recipeId,
                    userId: req.userId
                  }
                }).then(() => {
                  const newDownvote = {
                    recipeId: req.params.recipeId,
                    userId: req.userId
                  };
                  db.Downvote.create(newDownvote).then(() => {
                    db.Recipe.findById(req.params.recipeId).then((found) => {
                      if (found) {
                        found.increment('upvote', { where: { id: req.params.recipeId } });
                        found.increment('downvote', { where: { id: req.params.recipeId } });
                        return res.status(200).json({ message: 'recipe downvoted' });
                      }
                      if (!found) {
                        return res.status(500).json({ message: 'Cannot find recipe to increment' });
                      }
                    }).catch(error =>
                      // can't find recipe after destroying downvote
                      res.status(500).json({ message: error }));
                  }).catch(error =>
                    // cant create after destroying
                    res.status(500).json({ message: error }));
                }).catch(error =>
                  // cant destroy upvote
                  res.status(500).json({ message: error }));
              }
            }).catch(error =>
              // can't find in upvote
              res.status(500).json({ message: error }));
          }
          if (foundDownvote) {
            return res.status(403).json({ message: 'You already downvoted this recipe' });
          }
        }).catch(error =>
          // can't find user voted recipe in downvote
          res.status(500).json({ message: error }));
      }
    }).catch(error =>
      // check if recipe exist
      res.status(500).json({ message: error }));
  }
}
