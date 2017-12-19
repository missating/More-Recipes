import React from 'react';
import { connect } from 'react-redux';

// components
import RecipeGallery from './RecipeGallery';

// actions
import receiveRecipeRequest from '../actions/recipes';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
class Recipes extends React.Component {
  /**
   *
   *@returns {null} null
   * @memberof Recipes
   */
  componentWillMount() {
    this.props.receiveRecipe();
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof Recipes
   */
  render() {
    const recipe = (this.props.allRecipes) ? this.props.allRecipes : [];

    const recipeList = recipe.map((recipe, i) => (
      <div className="col-md-4" key={`recipe${i + 1}`}>
        <RecipeGallery
          name={recipe.name}
          ingredients={recipe.ingredients}
          descriptions={recipe.descriptions}
          upvote={recipe.upvote}
          downvote={recipe.downvote}
          id={recipe.id}
          userId={recipe.userId}
        />
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          {recipeList}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  allRecipes: state.receiveRecipe.allRecipes
});

const mapDispatchToProps = dispatch => ({
  receiveRecipe: () => dispatch(receiveRecipeRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
