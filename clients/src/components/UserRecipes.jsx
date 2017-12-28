import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// components
import UserRecipeCard from '../components/UserRecipeCard';

// actions
import receiveUserRecipes from '../actions/userRecipes';
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
    this.props.receiveUserRecipe();
  }
  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof UserRecipes
   */
  render() {
    let userRecipeError;
    if (this.props.userRecipes.errorMessage) {
      userRecipeError = (
        <span className="help-block">
          {this.props.userRecipes.errorMessage}
        </span>
      );
    }

    const userRecipes =
    (this.props.userRecipes.allUserRecipes) ?
      this.props.userRecipes.allUserRecipes : [];
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
                <Link className="btn btn-outline-primary"
                  to="/profile">
             My Profile
                </Link>
              </div>
              <div className="col-md-4">
                <Link className="btn btn-outline-primary"
                  to="/AddRecipe">
              Add Recipe
                </Link>
              </div>
              <div className="col-md-4">
                <Link className="btn btn-outline-primary"
                  to="">
              My Favourite Recipes
                </Link>
              </div>
            </div>
          </div>
          <section className="section" id="view">
            <div className="container">
              <h3 className="text-center bottom">My Recipes</h3>
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
              <Link className="btn btn-outline-primary"
                to="/profile">
             My Profile
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="btn btn-outline-primary"
                to="/AddRecipe">
              Add Recipe
              </Link>
            </div>
            <div className="col-md-4">
              <Link className="btn btn-outline-primary"
                to="">
              My Favourite Recipes
              </Link>
            </div>
          </div>
        </div>
        <section className="section" id="view">
          <div className="container">
            <h3 className="text-center bottom">My Recipes</h3>
            <h2> {userRecipeError} </h2>
          </div>
        </section>
      </div>
    );
  }
}

UserRecipes.propTypes = {
  receiveUserRecipe: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

UserRecipes.defaultProps = {
  userRecipes: []
};

const mapStateToProps = state => ({
  userRecipes: state.userRecipes,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  receiveUserRecipe: () => dispatch(receiveUserRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
