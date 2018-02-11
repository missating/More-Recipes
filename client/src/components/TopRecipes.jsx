import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import RecipeCard from './RecipeCard';

// actions
import getTopRecipes from '../actions/getTopRecipes';


/**
 *
 *
 * @class TopRecipes
 * @extends {React.Component}
 */
class TopRecipes extends React.Component {
  /**
   *
   *@returns {null} null
   * @memberof TopRecipes
   */
  componentWillMount() {
    this.props.recipes();
  }
  /**
 *
 *
 * @return {jsx} - a list of items to be rendered
 * @memberof TopRecipes
 */
  render() {
    const topRecipe = (this.props.topRecipes) ? this.props.topRecipes : [];

    let topRecipeList = topRecipe.map((recipe, i) => (
      <div className="col-md-4" key={`topRecipe${i + 1}`}>
        <RecipeCard
          {...recipe}
        />

      </div>
    ));

    if (topRecipe.length < 1) {
      topRecipeList =
        <h5 className="text-center display-5">Currently no featured recipes.</h5>;
    }
    return (
      <div>
        <section className="container">
          <h2 className="text-center mt-5"> Featured Recipes </h2>
          <hr />
          <div className="row justify-content-center">
            {topRecipeList}
          </div>
        </section>
      </div>
    );
  }
}

TopRecipes.propTypes = {
  recipes: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  topRecipes: state.topRecipes.recipes
});

const mapDispatchToProps = dispatch => ({
  recipes: () => dispatch(getTopRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRecipes);
