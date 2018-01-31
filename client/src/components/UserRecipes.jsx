import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// components
import UserRecipeCard from './UserRecipeCard';

// actions
import getUserRecipes from '../actions/getUserRecipes';
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
    this.state = {};
  }
  /**
 *
 *@returns {null} null
 * @memberof UserRecipes
 */
  componentWillMount() {
    this.props.recipes();
  }

  /**
   * @returns {undefined}
   *
   * @param {object} nextProps
   *
   * @memberof UserRecipes
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.userRecipes !== nextProps.userRecipes) {
      this.setState({
        userRecipes: nextProps.userRecipes
      });
    }
  }
  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof UserRecipes
   */
  render() {
    let userRecipeError;
    if (this.props.userRecipesError) {
      userRecipeError = (
        <span className="help-block">
          {this.props.userRecipesError}
        </span>
      );
    }

    const userRecipes =
      (this.state.userRecipes) ?
        this.state.userRecipes : [];
    const userRecipesList = userRecipes.map((recipe, i) => (
      <div className="col-md-4" key={`recipe${i + 1}`}>
        <UserRecipeCard
          {...recipe}
        />
      </div>
    ));
    if (userRecipes.length) {
      return (
        <div>
          {
            !this.props.authenticated &&
            <Redirect to="/" />
          }
          <div className="container userButtons">
            <div className="row">
              <div className="col-md-4">
                <Link
                  className="btn btn-outline-primary"
                  to="/profile"
                >
                  My Profile
                </Link>
              </div>
              <div className="col-md-4">
                <Link
                  className="btn btn-outline-primary"
                  to="/recipe/add"
                >
                  Add Recipe
                </Link>
              </div>
              <div className="col-md-4">
                <Link
                  className="btn btn-outline-primary"
                  to="/user/favourites"
                >
                  My Favourite Recipes
                </Link>
              </div>
            </div>
          </div>
          <section className="section" id="view">
            <div className="container">
              <h3 className="text-center">My Recipes</h3>
              <div className="row">
                {userRecipesList}
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
              <Link
                className="btn btn-outline-primary"
                to="/profile"
              >
                My Profile
              </Link>
            </div>
            <div className="col-md-4">
              <Link
                className="btn btn-outline-primary"
                to="/recipe/add"
              >
                Add Recipe
              </Link>
            </div>
            <div className="col-md-4">
              <Link
                className="btn btn-outline-primary"
                to="/users/favourites"
              >
                My Favourite Recipes
              </Link>
            </div>
          </div>
        </div>
        <section className="section" id="view">
          <div className="container">
            <h3 className="text-center bottom">My Recipes</h3>
            <br />
            <h4 className="text-center m-5"> {userRecipeError} </h4>
          </div>
        </section>
      </div>
    );
  }
}

UserRecipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  userRecipes: state.userRecipes.recipes,
  userRecipesError: state.userRecipes.errorMessage,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  recipes: () => dispatch(getUserRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
