import db from '../models/database';

/**
 *
 *
 * @class Recipe
 */
class Recipe {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {json} the result from the api
   * @memberof Recipe
   */
  getAllRecipes(req, res) {
    if (req.query.sort) {
      const sorted = db.recipes.sort((a, b) => b.upVote - a.upVote);
      return res.status(200)
        .json({
          status: 'success',
          data: sorted
        });
    }
    return res.status(200)
      .json({
        status: 'success',
        recipes: db.recipes
      });
  }
}

export default Recipe;
