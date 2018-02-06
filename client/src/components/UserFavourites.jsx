import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// components
import RecipeCard from './RecipeCard';

// actions
import getUserFavourites from '../actions/getUserFavourites';

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
    this.state = {};
  }
  /**
 *
 *@returns {null} null
 * @memberof UserFavourites
 */
  componentWillMount() {
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
        userFavourites: nextProps.userFavourites
      });
    }
  }
  /**
   *
   *
   * @returns {jsx} - a list of items to be rendered
   * @memberof UserFavourites
   */
  render() {
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
            <br />
            <div className="row">
              {userFavouritesList}
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
          <br />
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
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  favourites: () => dispatch(getUserFavourites())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserFavourites);
