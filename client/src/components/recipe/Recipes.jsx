import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

// components
import RecipeCard from '../cards/RecipeCard';
import SearchRecipe from '../recipe/SearchRecipe';

// actions
import getAllRecipes from '../../actions/getAllRecipes';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
export class Recipes extends React.Component {
  /**
   * Creates an instance of Recipes.
   * @param {any} props
   * @memberof Recipes
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   *
   *@returns {null} null
   * @memberof Recipes
   */
  componentWillMount() {
    this.props.recipes();
  }

  /**
   * @returns {number} number of the page
   *
   * @param {any} current
   * @memberof Recipes
   */
  onPageChange(current) {
    const selected = current.selected + 1;
    this.props.history.push(`/recipes?page=${selected}`);
    this.props.recipes(selected);
  }

  /**
   *
   *
   * @returns {null} null
   * @memberof Recipes
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

          <SearchRecipe />

          <div className="row">
            {recipeList}
          </div>
          {
            recipeList.length > 6 && (
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
            )
          }

        </section>
      </div>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allRecipes: state.recipes.allrecipes,
  pagination: state.pagination,
  isFetching: state.isFetching,
});

const mapDispatchToProps = dispatch => ({
  recipes: page => dispatch(getAllRecipes(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
