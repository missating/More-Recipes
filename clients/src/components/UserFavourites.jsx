import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// components
import UserFavouritesCard from './UserFavouritesCard';

// actions
import receiveUserFavourites from '../actions/userFavourites';

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
    this.props.receiveUserFavourite();
  }
  /**
   *
   *
   * @returns {jsx} - a list of items to be rendered
   * @memberof UserFavourites
   */
  render() {
    // let userFavouriteError;
    // if (this.props.userFavourites.errorMessage) {
    //   userFavouriteError = (
    //     <span className="help-block">
    //       {this.props.userFavourites.errorMessage}
    //     </span>
    //   );
    // }

    const userFavourites =
    (this.props.userFavourites) ?
      this.props.userFavourites : [];
    const userFavouritesList = userFavourites.map((favourites, i) => (
      <div className="col-md-4" key={`favourites${i + 1}`}>
        <UserFavouritesCard
          name={favourites.Recipe.name}
          description={favourites.Recipe.description}
          id={favourites.recipeId}
        />
      </div>
    ));

    if (userFavourites.length) {
      return (
        <div>

          {
            !this.props.authenticated &&
            <Redirect to="/" />
          }
          <div className="container userButtons">
            <div className="row">
              <div className="col-md-4">
                <Link className="btn btn-outline-primary"
                  to="/profile">
             My Profile
                </Link>
              </div>
              <div className="col-md-4">
                <Link className="btn btn-outline-primary"
                  to="/recipe/add">
              Add Recipe
                </Link>
              </div>
              <div className="col-md-4">
                <Link className="btn btn-outline-primary"
                  to="/user/favourites">
              My Favourite Recipes
                </Link>
              </div>
            </div>
          </div>
          <section className="section" id="view">
            <div className="container">
              <h3 className="text-center bottom">My Favourite Recipes</h3>
              <div className="row">
                {userFavouritesList}
              </div>
            </div>
          </section>
        </div>
      );
    }
    return (
      <div>
        {
          !this.props.authenticated &&
          <Redirect to="/" />
        }
        <div className="container userButtons">
          <div className="row">
            <div className="col-md-4">
              <Link className="btn btn-outline-primary"
                to="/profile">
             My Profile
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="btn btn-outline-primary"
                to="/recipe/add">
              Add Recipe
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="btn btn-outline-primary"
                to="/user/favourites">
              My Favourite Recipes
              </Link>
            </div>
          </div>
        </div>
        <section className="section" id="view">
          <div className="container">
            <h3 className="text-center bottom">My Favourite Recipes</h3>
            <br />
            {/* <h4> {userFavouriteError} </h4> */}
          </div>
        </section>
      </div>
    );
  }
}

UserFavourites.propTypes = {
  receiveUserFavourite: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

UserFavourites.defaultProps = {
  userFavourites: []
};

const mapStateToProps = state => ({
  userFavourites: state.userFavourites.allUserFavourites,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  receiveUserFavourite: () => dispatch(receiveUserFavourites())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserFavourites);
