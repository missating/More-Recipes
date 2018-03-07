import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

// components
import RecipeCard from '../cards/RecipeCard';
import { ConnectedSearchRecipe } from '../recipe/SearchRecipe';

// actions
import getAllRecipes from '../../actions/getAllRecipes';

/**
 * @description Creates Recipes component
 *
 * @class Recipes
 *
 * @extends {React.Component}
 */
export class Recipes extends React.Component {
  /**
   * @description Creates an instance of Recipes.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof Recipes
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPageChange = this.onPageChange.bind(this);
  }


  /**
   * @description Get recipes
   *
   * @memberof Recipes
   *
   * @returns {void}
   */
  componentWillMount() {
    this.props.recipes();
  }

  /**
   * @description pagination for recipes
   *
   * @param {number} current
   *
   * @memberof Recipes
   *
   * @returns {void}
   */
  onPageChange(current) {
    const selected = current.selected + 1;
    this.props.history.push(`/recipes?page=${selected}`);
    this.props.recipes(selected);
  }


  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof Recipes
   *
   * @returns {void}
   *
   */
  render() {
    const { pages } = this.props.pagination;

    const recipes = this.props.allRecipes ? this.props.allRecipes : [];
    let recipeList;
    if (recipes.length === 0) {
      recipeList = (
        <div className="text-center ml-5" style={{ width: '100%' }}>
          <h4> No recipe(s) found </h4>
        </div>
      );
    } else {
      recipeList = recipes.map((recipe, i) => (
        <div className="col-md-6 col-lg-4 p-0" key={`recipe${i + 1}`}>
          <RecipeCard
            {...recipe}
          />
        </div>
      ));
    }


    return (
      <div>
        <section className="container" id="recipes">

          <ConnectedSearchRecipe />

          <div className="row mh-500">
            {recipeList}
          </div>


          <div className="container">
            <ReactPaginate
              pageCount={pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={3}
              previousLabel="Previous"
              nextLabel="Next"
              breakClassName="text-center"
              initialPage={0}
              containerClassName="container pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="page-item active"
              previousClassName="page-item"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              onPageChange={this.onPageChange}
            />
          </div>


        </section>
      </div>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  allRecipes: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  pagination: PropTypes.shape({
    pages: PropTypes.number
  })
};

Recipes.defaultProps = {
  pagination: {
    pages: 1
  },
  allRecipes: []
};

const mapStateToProps = state => ({
  allRecipes: state.recipes.allrecipes,
  pagination: state.pagination,
  isFetching: state.isFetching,
});

const mapDispatchToProps = dispatch => ({
  recipes: page => dispatch(getAllRecipes(page))
});

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(Recipes);
export { ConnectedComponent as ConnectedRecipes };

