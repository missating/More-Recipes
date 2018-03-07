import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router-dom';

// components
import { ConnectedUserRecipeCard } from '../cards/UserRecipeCard';

// actions
import getUserRecipes from '../../actions/getUserRecipes';

/**
 * @description Creates UserRecipes component
 *
 * @class UserRecipes
 *
 * @extends {React.Component}
 */
export class UserRecipes extends React.Component {
  /**
   * @description Creates an instance of UserFavourites.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof UserRecipes
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.onPageChange = this.onPageChange.bind(this);
  }


  /**
   * @description Gets user's recipes
   *
   * @method
   *
   * @memberof UserRecipes
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.recipes();
  }

  /**
   * @description Set state
   *
   * @param {object} nextProps
   *
   * @memberof UserRecipes
   *
   * @returns {void}
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
   * @description pagination for user recipes
   *
   * @param {number} current
   *
   * @memberof UserRecipes
   *
   * @returns {void}
   */
  onPageChange(current) {
    const selected = current.selected + 1;
    this.props.history.push(`/users/recipes?page=${selected}`);
    this.props.recipes(selected);
  }


  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof UserRecipes
   *
   * @returns {void}
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
        <ConnectedUserRecipeCard
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
            <div className="row mh-500">
              {userRecipesList}
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
  pagination: PropTypes.shape({
    pages: PropTypes.number
  }),
  userRecipes: PropTypes.arrayOf(PropTypes.shape({})),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

UserRecipes.defaultProps = {
  pagination: {
    pages: 1
  },
  userRecipes: []
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

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
export { ConnectedComponent as ConnectedUserRecipes };

