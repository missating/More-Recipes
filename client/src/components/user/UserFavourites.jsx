import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// components
import RecipeCard from '../cards/RecipeCard';

// actions
import getUserFavourites from '../../actions/getUserFavourites';
import { removeUserFavourite } from '../../actions/addFavourite';

/**
 * @description Creates UserFavourites component
 *
 * @class UserFavourites
 *
 * @extends {React.Component}
 */
export class UserFavourites extends React.Component {
  /**
   * @description Creates an instance of UserFavourites.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof UserFavourites
   *
   * @returns {void}
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
   * @description Gets user's favourites
   *
   * @method
   *
   * @memberof UserFavourites
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.favourites();
  }


  /**
   * @description Set state
   *
   * @param {object} nextProps
   *
   * @memberof UserFavourites
   *
   * @returns {void}
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
   * @description pagination for user favourites
   *
   * @param {number} current
   *
   * @memberof UserFavourites
   *
   * @returns {void}
   */
  onPageChange(current) {
    const selected = current.selected + 1;
    this.props.history.push(`/users/favourites?page=${selected}`);
    this.props.favourites(selected);
  }

  /**
   * @description removes a user's favourites
   *
   * @param {number} id
   *
   * @memberof UserFavourites
   *
   * @returns {void}
   */
  removeFromFavourite(id) {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to remove this recipe ?',
      confirmLabel: 'Yes, remove!',
      cancelLabel: 'Cancel',
      onConfirm: () =>
        this.props.removeFavourite(id),
    });
  }


  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof UserFavourites
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

    const userFavourites =
      (this.state.userFavourites) ?
        this.state.userFavourites : [];

    let userFavouritesError;
    if (userFavourites.length === 0) {
      userFavouritesError = (
        <span className="help-block">
          You have no recipes added as favourites
        </span>
      );
    }


    const userFavouritesList = userFavourites.map((favourites, i) => (
      <div className="col-md-4" key={`favourites${i + 1}`}>
        <RecipeCard
          recipeImage={favourites.Recipe.recipeImage}
          name={favourites.Recipe.name}
          description={favourites.Recipe.description}
          id={favourites.recipeId}
          button
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
            <div className="row mh-500">
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
  pagination: PropTypes.shape({
    pages: PropTypes.number
  }),
  userFavourites: PropTypes.arrayOf(PropTypes.shape({})),
  removeFavourite: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

UserFavourites.defaultProps = {
  pagination: {
    pages: 1
  },
  userFavourites: []
};


const mapStateToProps = state => ({
  userFavourites: state.userFavourites.favourites,
  authenticated: state.auth.isAuthenticated,
  pagination: state.pagination,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  favourites: page => dispatch(getUserFavourites(page)),
  removeFavourite: recipedId => dispatch(removeUserFavourite(recipedId))
});

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(UserFavourites);
export { ConnectedComponent as ConnectedUserFavourites };
