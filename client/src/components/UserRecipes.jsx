import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <div className="loader-container">
          <div className="loader" />
        </div>
      );
    }

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
  userRecipesError: state.userRecipes.errorMessage,
  authenticated: state.auth.isAuthenticated,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  recipes: () => dispatch(getUserRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
