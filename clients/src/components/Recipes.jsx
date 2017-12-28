import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import RecipeGallery from './RecipeGallery';

// actions
import fetchAllRecipes from '../actions/recipes';

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
    this.props.getAllRecipes();
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof Recipes
   */
  render() {
    const recipes = (this.props.allRecipes) ? this.props.allRecipes : [];

    const recipeList = recipes.map((recipe, i) => (
      <div className="col-md-4" key={`recipe${i + 1}`}>
        <RecipeGallery
          {...recipe}
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

Recipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  allRecipes: PropTypes.array.isRequired
};

Recipes.defaultProps = {
  allRecipes: ''
};

const mapStateToProps = state => ({
  allRecipes: state.allRecipes.recipes
});

const mapDispatchToProps = dispatch => ({
  getAllRecipes: () => dispatch(fetchAllRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
