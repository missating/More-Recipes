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
 * @description Creates AddRecipe component
 *
 * @class AddRecipe
 *
 * @extends {React.Component}
 */
export class AddRecipe extends React.Component {
  /**
   * @description Creates an instance of AddRecipe.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof AddRecipe
   *
   * @returns {void}
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
      // eslint-disable-next-line
      defaultImg: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517914951/noImage_u3sry1.png',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  /**
   * @description Bind the value of the inputs to state
   *
   * @method onChange
   *
   * @param {object} event
   *
   * @memberof AddRecipe
   *
   * @returns {void}
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
   * @description Submit the form
   *
   * @method onSubmit
   *
   * @param {object} event
   *
   * @memberof AddRecipe
   *
   * @returns {void}
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
   * @description Handles image drop
   *
   * @method handleDrop
   *
   * @memberof AddRecipe
   *
   * @param {array} files
   *
   * @returns {void}
   */
  handleDrop(files) {
    this.setState({
      newRecipe: {
        recipeImage: files[0]
      }
    });
  }


  /**
   * @description Handle image upload
   *
   * @method  uploadToCloudinary
   *
   * @memberof AddRecipe
   *
   * @returns {void}
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
   * @description Validates user's data before making post request
   *
   * @method isValid
   *
   * @memberof AddRecipe
   *
   * @returns {boolean} true or false
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
   * @description Renders react component
   *
   * @method render
   *
   * @memberof AddRecipe
   *
   * @returns {void}
   *
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
                      <h5 className="text-center">
                        Click here to upload
                      </h5>
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
                    id="recipeName"
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
                    id="recipeIngredients"
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
                    placeholder="Instructions on how this dish is made..."
                    name="description"
                    value={newRecipe.description}
                    onChange={this.onChange}
                  />
                  {
                    errors.description &&
                    <span
                      className="help-block text-danger"
                      id="recipeDescriptionError"
                    >
                      {errors.description}
                    </span>
                  }
                </div>

                <div className="form-group form-width">
                  <button
                    id="recipeButton"
                    className="btn btn-secondary"
                    disabled={this.state.submitting}
                  >
                    {this.state.submitting ? 'Submitting...' : 'Add Recipe'}
                  </button>
                  <Link
                    className="btn btn-secondary"
                    id="cancelButton"
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

const ConnectedComponent =
  connect(mapStateToProps, { addNewRecipe: addRecipe })(AddRecipe);
export { ConnectedComponent as ConnectedAddRecipe };

