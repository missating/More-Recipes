import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// validations
import recipeValidator from '../validation/recipeValidator';

// action
import addRecipe from '../actions/addRecipe';

/**
 *
 *
 * @className AddRecipe
 * @extends {React.Component}
 */
class AddRecipe extends React.Component {
  /**
   * Creates an instance of AddRecipe.
   * @param {any} props
   * @memberof AddRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      newRecipe: {
        name: '',
        ingredients: '',
        description: ''
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 *
 * @returns {null} null
 * @param {any} event
 * @memberof AddRecipe
 */
  onChange(event) {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [event.target.name]: event.target.value
      }
    });
  }
  /**
 *
 *
 * @returns {boolean} boolean
 * @memberof AddRecipe
 */
  isValid() {
    const { errors, isValid } = recipeValidator(this.state.newRecipe);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
 *
 *
 * @param {any} event
 * @returns {dispatch} react-redux dispatch
 * @memberof AddRecipe
 */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (isValid) {
      this.props.addNewRecipe(this.state.newRecipe).then(() => {
        this.setState({
          newRecipe: {
            name: '',
            ingredients: '',
            description: ''
          }
        });
      });
    }
  }

  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof AddRecipe
   */
  render() {
    const { errors, newRecipe } = this.state;

    let addRecipeError;
    if (this.props.addRecipe.errorMessage) {
      addRecipeError = (
        <div className="alert alert-danger alert-dismissible">
          {this.props.addRecipe.errorMessage}
        </div>
      );
    }
    return (
      <div> {
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
              to="/UserRecipes">
              My Recipes
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

      <section className="section" id="add">

        <h3 className="text-center bottom">Add New Recipe</h3>

        <div className="row">
          <div className="col-md-12">

            {
              this.props.addRecipe.errorMessage === "" &&
                <div className="alert alert-success alert-dismissible"
                  role="alert">
              Recipe Added
                </div>
            }

            {addRecipeError}

            <form className="form-horizontal" onSubmit={this.onSubmit}>

              <div className="form-group">
                <input type="text"
                  name="name"
                  className="form-control"
                  placeholder="Recipe Name"
                  value={newRecipe.name}
                  onChange={this.onChange} />
                {errors.name &&
                  <span className="help-block">{errors.name}</span>}
              </div>


              <div className="form-group">
                <input type="text"
                  name="ingredients"
                  className="form-control"
                  placeholder="Ingredients"
                  value={newRecipe.ingredients}
                  onChange={this.onChange} />
                {errors.ingredients &&
                  <span className="help-block">{errors.ingredients}</span>}
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  rows="5"
                  id="recipeDescription"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={newRecipe.description}
                  onChange={this.onChange}
                />
                {errors.description &&
                  <span className="help-block">{errors.description}</span>}
              </div>

              <div className="form-group">
                <button className="btn btn-primary">Add Recipe</button>
              </div>

            </form>

          </div>

        </div>

      </section>
      </div>

    );
  }
}

AddRecipe.propTypes = {
  addNewRecipe: PropTypes.func.isRequired,
  addRecipe: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

AddRecipe.defaultProps = {
  addRecipe: ''
};

const mapStateToProps = state => ({
  addRecipe: state.addRecipe,
  authenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  addNewRecipe: addRecipe
})(AddRecipe);
