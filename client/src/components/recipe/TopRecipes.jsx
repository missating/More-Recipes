import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import RecipeCard from '../cards/RecipeCard';

// actions
import getTopRecipes from '../../actions/getTopRecipes';


/**
 * @description Creates TopRecipes component
 *
 * @class TopRecipes
 *
 * @extends {React.Component}
 */
export class TopRecipes extends React.Component {
  /**
   * @description Gets top recipes
   *
   * @method
   *
   * @memberof TopRecipes
   *
   * @returns {void}
   */
  componentWillMount() {
    this.props.recipes();
  }


  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof TopRecipes
   *
   * @returns {void}
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

    if (topRecipe.length === 0) {
      topRecipeList =
        (
          <div>
            <h4 className="text-center display-5">
              Currently no featured recipes
            </h4>
          </div>
        );
    }
    return (
      <div>
        <section className="container" id="featured">
          <h2
            className="text-center mt-5"
            id="featuredHeading"
          >
            Featured Recipes
          </h2>
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
  recipes: PropTypes.func.isRequired,
  topRecipes: PropTypes.arrayOf(PropTypes.object)
};

TopRecipes.defaultProps = {
  topRecipes: []
};


const mapStateToProps = state => ({
  topRecipes: state.topRecipes.recipes
});

const mapDispatchToProps = dispatch => ({
  recipes: () => dispatch(getTopRecipes())
});


const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(TopRecipes);
export { ConnectedComponent as ConnectedTopRecipes };

