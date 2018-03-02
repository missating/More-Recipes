import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// validations
import recipeValidator from '../../validation/recipeValidator';

// action
import addRecipe from '../../actions/addRecipe';


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
        submitting: false
      },
      errors: {},
      defaultImg: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517914951/noImage_u3sry1.png',
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
    this.setState({
      submitting: true
    });
    const { newRecipe } = this.state;
    const isValid = this.isValid();
    if (isValid) {
      if (newRecipe.recipeImage) {
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
                  recipeImage: '',
                  submitting: false,
                }
              });
              this.props.history.push('/users/recipes');
            });
        });
      } else {
        const recipeData = { ...newRecipe, recipeImage: this.state.defaultImg };
        this.props.addNewRecipe(recipeData)
          .then(() => {
            this.setState({
              newRecipe: {
                name: '',
                ingredients: '',
                description: '',
                recipeImage: '',
                submitting: false,
              }
            });
            this.props.history.push('/users/recipes');
          });
      }
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
      this.setState({ errors, submitting: false });
    } else {
      this.setState({ errors: {} });
      return isValid;
    }
  }

  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof AddRecipe
   */
  render() {
    const { errors, newRecipe, defaultImg } = this.state;
    return (
      <div>
        {
          !this.props.authenticated &&
          <Redirect to="/" />
        }


        <section className="container" id="recipes">

          <h3 className="text-center mb-4">New Recipe</h3>

          <div className="row">
            <div className="col-md-12 col-sm-12">
              <form onSubmit={this.onSubmit}>
                <Dropzone
                  onDrop={this.handleDrop}
                  accept="image/*"
                  multiple={false}
                  style={{
                    border: '3px dashed ',
                    width: '300px',
                    height: 'auto',
                    margin: '0 auto',
                    padding: '5px'
                  }}
                >
                  {!newRecipe.recipeImage.preview &&
                    <div>
                      <img
                        src={defaultImg}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                      <h5 className="text-center">Click here to upload</h5>
                    </div>
                  }
                  {
                    newRecipe.recipeImage.preview &&
                    <img
                      src={newRecipe.recipeImage.preview}
                      alt=""
                      className="img-fluid mx-auto d-block"
                    />
                  }
                </Dropzone>

                <div className="form-group form-width">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="The name of the dish..."
                    value={newRecipe.name}
                    onChange={this.onChange}
                  />
                  {
                    errors.name &&
                    <span
                      className="help-block text-danger"
                    >
                      {errors.name}
                    </span>
                  }
                </div>


                <div className="form-group form-width">
                  <input
                    type="text"
                    name="ingredients"
                    className="form-control"
                    placeholder="A comma seperated list of ingredients..."
                    value={newRecipe.ingredients}
                    onChange={this.onChange}
                  />
                  {
                    errors.ingredients &&
                    <span
                      className="help-block text-danger"
                    >
                      {errors.ingredients}
                    </span>
                  }
                </div>

                <div className="form-group form-width">
                  <textarea
                    type="text"
                    rows="5"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="Instructions on how this dish should be made..."
                    name="description"
                    value={newRecipe.description}
                    onChange={this.onChange}
                  />
                  {
                    errors.description &&
                    <span
                      className="help-block text-danger"
                    >
                      {errors.description}
                    </span>
                  }
                </div>

                <div className="form-group form-width">
                  <button
                    className="btn btn-secondary"
                    disabled={this.state.submitting}
                  >
                    {this.state.submitting ? 'Submitting...' : 'Add Recipe'}
                  </button>
                  <Link
                    className="btn btn-secondary"
                    to="/users/recipes"
                  >
                    Cancel
                  </Link>
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
  authenticated: state.auth.isAuthenticated,
  errorMessage: state.errorMessage
});

export default connect(mapStateToProps, {
  addNewRecipe: addRecipe
})(AddRecipe);
