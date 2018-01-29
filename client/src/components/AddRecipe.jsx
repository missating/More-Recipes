import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// validations
import recipeValidator from '../validation/recipeValidator';

// action
import addRecipe from '../actions/addRecipe';

import eleven from '../assets/eleven.jpg';

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
        description: '',
        recipeImage: '',
      },
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
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
 * @param {any} event
 * @returns {dispatch} react-redux dispatch
 * @memberof AddRecipe
 */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (isValid) {
      //  upload to cloudinary, then create recipe
      // this.uploadToClourinary().then();
      this.uploadToCloudinary().then((response) => {
        const secureUrl = response.data.secure_url;
        const recipeData = this.state.newRecipe;
        recipeData.recipeImage = secureUrl;

        this.props.addNewRecipe(recipeData)
          .then(() => {
            this.setState({
              newRecipe: {
                name: '',
                ingredients: '',
                description: '',
                recipeImage: ''
              }
            });
            this.props.history.push('/users/recipes');
          });
      });
    }
  }

  /**
   * Handle image drop
   * @param {array} files
   * @returns {null} null
   */
  handleDrop(files) {
    this.setState({
      newRecipe: {
        recipeImage: files[0]
      }
    });
  }
  /**
   * Handle image upload
   * @returns {null} null
   */
  uploadToCloudinary() {
    const formData = new FormData();
    formData.append('file', this.state.newRecipe.recipeImage);
    formData.append('upload_preset', 'moreRecipes');
    formData.append('api_key', '462882972372719');

    return axios.post(
      'https://api.cloudinary.com/v1_1/dxayftnxb/image/upload',
      formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }
    );
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
   * @description react render method
   *
   * @returns {component} react component
   * @memberof AddRecipe
   */
  render() {
    const { errors, newRecipe } = this.state;
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
                to="/users/recipes"
              >
                My Recipes
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

        <section className="section" id="add">

          <h3 className="text-center bottom">Add New Recipe</h3>

          <div className="row">
            <div className="col-md-12">
              <form className="form-horizontal" onSubmit={this.onSubmit}>
                <Dropzone
                  style={{ border: 'none', cursor: 'pointer' }}
                  accept="image/*"
                  onDrop={this.handleDrop}
                >
                  <div className="recipe-image form-group" >
                    <img
                      style={{ maxHeight: '150px' }}
                      className="img-thumbnail"
                      src={newRecipe.recipeImage.preview || eleven}
                      alt="recipe"
                      id="img-preview"
                    />
                  </div>
                </Dropzone>

                <div className="form-group">
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    name="file"
                    id="file-upload"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Recipe Name"
                    value={newRecipe.name}
                    onChange={this.onChange}
                  />
                  {errors.name &&
                    <span className="help-block">{errors.name}</span>}
                </div>


                <div className="form-group">
                  <input
                    type="text"
                    name="ingredients"
                    className="form-control"
                    placeholder="Ingredients"
                    value={newRecipe.ingredients}
                    onChange={this.onChange}
                  />
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
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};


const mapStateToProps = state => ({
  addRecipe: state.addRecipe,
  authenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  addNewRecipe: addRecipe
})(AddRecipe);
