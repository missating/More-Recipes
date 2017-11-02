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
   * @returns status code and message
   * @memberof Vote
   */
  static upvote(req, res) {
    db.Recipe.findById(req.params.recipeId).then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).json({ message: 'recipe not found' });
      }
      if (foundRecipe) {
        db.upvote.findOne({
          where: {
            userId: req.body.userId,
            recipeId: req.params.recipeId
          },
          attributes: ['id', 'recipeId', 'userId']
        }).then((foundUpvote) => {
          if (!foundUpvote) {
            // find if recipe has been downvoted by same user
            db.downvote.findOne({
              where: {
                recipeId: req.params.recipeId,
                userId: req.body.userId
              },
              attributes: ['id', 'recipeId', 'userId']
            }).then((foundDownvote) => {
              if (!foundDownvote) {
                // create upvote
                const newUpvote = {
                  recipeId: req.params.recipeId,
                  userId: req.body.id
                };
                db.upvote.create(newUpvote).then(() => {
                  db.Recipe.findById(req.params.recipeId).then((found) => {
                    if (!found) {
                      return res.status(500).json({ message: 'couldn\'t upvote recipe' });
                    }
                    if (found) {
                      found.increment('upvote');
                      return res.status(201).json({ message: 'upvoted!' });
                    }
                  }).catch(error => res.status(500).json({ message: error }));
                }).catch(error => res.status(500).json({ message: error }));
              }
              if (foundDownvote) {
                db.downvote.destroy({
                  where: {
                    recipeId: req.params.recipeId,
                    userId: req.body.userId
                  }
                }).then(() => {
                  // after destroying downvote, create upvote, increment recipe's upvote
                  const newUpvote = {
                    recipeId: req.params.recipeId,
                    userId: req.body.id
                  };
                  db.upvote.create(newUpvote).then(() => {
                    db.Recipe.findById(req.params.recipeId).then((found) => {
                      if (found) {
                        found.increment('upvote');
                        found.decrement('downvote');
                        return res.status(201).json({ message: 'recipe upvoted' });
                      }
                      if (!found) {
                        return res.status(500).json({ message: 'Can\'t find recipe' });
                      }
                    }).catch(error =>
                      // error can't find recipe after destroying downvote
                      res.status(500).json({ message: error }));
                  }).catch(error =>
                    // error creating upvote after destroying in downvote
                    res.status(500).json({ message: error }));
                }).catch(error =>
                  // couldn't destroy in downvote
                  res.status(500).json({ message: error }));
              }
            }).catch(error => res.status(500).json({ message: error }));
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
   * @memberof Vote
   */
  static downVote(req, res) {
    db.Recipe.findById(req.params.recipeId).then((foundRecipe) => {
      if (!foundRecipe) {
        return res.json({ message: 'recipe not found, ensure recipe Id is valid' });
      }
      if (foundRecipe) {
        db.downvote.findOne({
          where: {
            userId: req.body.id,
            recipeId: req.params.recipeId
          },
          attributes: ['id', 'recipeId', 'userId']
        }).then((foundDownvote) => {
          if (!foundDownvote) {
            db.upvote.findOne({
              where: {
                recipeId: req.params.recipeId,
                userId: req.body.userId
              },
              attributes: ['id', 'recipeId', 'userId']
            }).then((foundUpvote) => {
              if (!foundUpvote) {
                // create new downvote
                const newDownvote = {
                  recipeId: req.params.recipeId,
                  userId: req.body.userId
                };
                db.downvote.create(newDownvote).then(() => {
                  db.Recipe.findById(req.params.recipeId).then((found) => {
                    if (!found) {
                      return res.status(500).json({ message: 'couldn\'t upvote recipe' });
                    }
                    if (found) {
                      found.increment('downvote');
                      return res.status(201).json({ message: 'downvoted!' });
                    }
                  }).catch(error =>
                    // cant find after creating downvote
                    res.status(500).json({ message: error }));
                }).catch(error =>
                  // can't create new new downvote
                  res.status(500).json({ message: error }));
              }
              if (foundUpvote) {
                db.upvote.destroy({
                  where: {
                    recipeId: req.params.recipeId,
                    userId: req.body.userId
                  }
                }).then(() => {
                  const newDownvote = {
                    recipeId: req.params.recipeId,
                    userId: req.body.userId
                  };
                  db.downvote.create(newDownvote).then(() => {
                    db.Recipe.findById(req.params.recipeId).then((found) => {
                      if (found) {
                        found.increment('downvote');
                        found.decrement('upvote');
                        return res.status(201).json({ message: 'recipe downvoted' });
                      }
                      if (!found) {
                        return res.status(500).json({ message: 'Can\'t find recipe' });
                      }
                    }).catch(error => res.status(500).json({ message: error }));
                  }).catch(error => res.status(500).json({ message: error }));
                }).catch(error => res.status(500).json({ message: error }));
              }
            }).catch(error => res.status(500).json({ message: error }));
          }
          if (foundDownvote) {
            return res.status(403).json({ message: 'You already downvoted this recipe' });
          }
        }).catch(error => res.status(500).json({ message: error }));
      }
    }).catch(error => res.status(500).json({ message: error }));
  }
}
