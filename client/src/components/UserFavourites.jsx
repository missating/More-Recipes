import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// components
import RecipeCard from './RecipeCard';

// actions
import getUserFavourites from '../actions/getUserFavourites';

import { removeUserFavourite } from '../actions/addFavourite';

/**
 *
 *
 * @class UserFavourites
 * @extends {React.Component}
 */
class UserFavourites extends React.Component {
  /**
     * Creates an instance of UserFavourites.
     * @param {any} props
     * @memberof UserFavourites
     */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.removeFromFavourite = this.removeFromFavourite.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
 *
 *@returns {null} null
 * @memberof UserFavourites
 */
  componentDidMount() {
    this.props.favourites();
  }
  /**
 * @returns {undefined}
 *
 * @param {object} nextProps
 * @memberof UserFavourites
 */
  componentWillReceiveProps(nextProps) {
    if (this.props.userFavourites !== nextProps.userFavourites) {
      this.setState({
        userFavourites: nextProps.userFavourites,
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
    this.props.favourites(selected);
  }

  /**
 *
 *
 * @param {any} id
 * @memberof UserFavourites
 */
  removeFromFavourite(id) {
    confirmAlert({
      message: 'Are you sure you want to remove this recipe ?',
      confirmLabel: 'Yes, remove!',
      cancelLabel: 'Cancel',
      onConfirm: () =>
        this.props.removeFavourite(id),
    });
  }


  /**
   *
   *
   * @returns {jsx} - a list of items to be rendered
   * @memberof UserFavourites
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

    let userFavouritesError;
    if (this.props.userFavouritesError) {
      userFavouritesError = (
        <span className="help-block">
          {this.props.userFavouritesError}
        </span>
      );
    }

    const userFavourites =
      (this.state.userFavourites) ?
        this.state.userFavourites : [];
    const userFavouritesList = userFavourites.map((favourites, i) => (
      <div className="col-md-4" key={`favourites${i + 1}`}>
        <RecipeCard
          recipeImage={favourites.Recipe.recipeImage}
          name={favourites.Recipe.name}
          description={favourites.Recipe.description}
          id={favourites.recipeId}
          button="true"
          onButtonClick={this.removeFromFavourite}
        />
      </div>
    ));

    if (userFavourites.length) {
      return (
        <section className="container" id="recipes">
          <div>
            {
              !this.props.authenticated &&
              <Redirect to="/" />
            }

            <h3 className="text-center">My Favourite Recipes</h3>
            <hr />
            <div className="row">
              {userFavouritesList}
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
      <section className="container" id="recipes">
        <div>
          {
            !this.props.authenticated &&
            <Redirect to="/" />
          }

          <h3 className="text-center">My Favourite Recipes</h3>
          <hr />
          <h4 className="text-center m-5"> {userFavouritesError} </h4>
        </div>
      </section>
    );
  }
}

UserFavourites.propTypes = {
  favourites: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  userFavourites: state.userFavourites.favourites,
  userFavouritesError: state.userFavourites.errorMessage,
  authenticated: state.auth.isAuthenticated,
  pagination: state.pagination,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  favourites: page => dispatch(getUserFavourites(page)),
  removeFavourite: recipedId => dispatch(removeUserFavourite(recipedId))
});


export default connect(mapStateToProps, mapDispatchToProps)(UserFavourites);
