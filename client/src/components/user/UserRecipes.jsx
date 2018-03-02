import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router-dom';

// components
import UserRecipeCard from '../cards/UserRecipeCard';

// actions
import getUserRecipes from '../../actions/getUserRecipes';
/**
 *
 *
 * @className UserRecipe
 * @extends {React.Component}
 */
class UserRecipes extends React.Component {
  /**
 * Creates an instance of UserRecipes.
 * @param {any} props
 * @memberof UserRecipes
 */
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 *
 *@returns {null} null //
 * @memberof UserRecipes
 */
  componentDidMount() {
    this.props.recipes();
  }

  /**
   * @returns {undefined}
   *
   * @param {object} nextProps
   * @memberof UserRecipes
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.userRecipes !== nextProps.userRecipes) {
      this.setState({
        userRecipes: nextProps.userRecipes,
        loading: false
      });
    }
  }

  /**
   * @returns {number} number of the page
   *
   * @param {any} current
   * @memberof Recipes
   */
  onPageChange(current) {
    const selected = current.selected + 1;
    this.props.history.push(`/users/recipes?page=${selected}`);
    this.props.recipes(selected);
  }

  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof UserRecipes
   */
  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="loader-container">
          <div className="loader" />
        </div>
      );
    }

    const { pages } = this.props.pagination;

    const userRecipes =
      (this.state.userRecipes) ?
        this.state.userRecipes : [];

    let userRecipeError;
    if (userRecipes.length === 0) {
      userRecipeError = (
        <span className="help-block">
          You currently have no recipes
        </span>
      );
    }

    const userRecipesList = userRecipes.map((recipe, i) => (
      <div className="col-md-6 col-lg-4 col-sm-6 p-0" key={`recipe${i + 1}`}>
        <UserRecipeCard
          {...recipe}
        />
      </div>
    ));
    if (userRecipes.length) {
      return (
        <section className="container p-0" id="recipes">
          <div>
            {
              !this.props.authenticated &&
              <Redirect to="/" />
            }

            <h3 className="text-center">My Recipes</h3>
            <hr />
            <div className="row">
              {userRecipesList}
            </div>
            {
              userRecipesList.length > 6 && (
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

          </div>
        </section>
      );
    }
    return (
      <section className="section" id="recipes">
        <div>
          {
            !this.props.authenticated &&
            <Redirect to="/" />
          }

          <h3 className="text-center">My Recipes</h3>
          <hr />
          <h4 className="text-center m-5"> {userRecipeError} </h4>
        </div>
      </section>
    );
  }
}

UserRecipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  userRecipes: state.userRecipes.recipes,
  authenticated: state.auth.isAuthenticated,
  pagination: state.pagination,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  recipes: page => dispatch(getUserRecipes(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
