import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import RecipeGallery from './RecipeGallery';

// actions
import getAllRecipes from '../actions/getAllRecipes';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
export class Recipes extends React.Component {
  /**
   *
   *@returns {null} null
   * @memberof Recipes
   */
  componentWillMount() {
    this.props.recipes();
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof Recipes
   */
  render() {
    const recipes = this.props.allRecipes ? this.props.allRecipes : [];

    const recipeList = recipes.map((recipe, i) => (
      <div className="col-md-4" key={`recipe${i + 1}`}>
        <RecipeGallery {...recipe} />
      </div>
    ));

    return (
      <div id="recipe-container" className="container">
        <div className="row">{recipeList}</div>
      </div>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allRecipes: state.recipes.allrecipes
});

const mapDispatchToProps = dispatch => ({
  recipes: () => dispatch(getAllRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
