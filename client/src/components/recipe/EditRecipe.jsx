import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Link, Redirect } from 'react-router-dom';

// validations
import recipeValidator from '../../validation/recipeValidator';

// action
import getSingleRecipe from '../../actions/getSingleRecipe';
import editRecipe from '../../actions/editRecipe';


/**
 * @description Creates EditRecipe component
 *
 * @class EditRecipe
 *
 * @extends {React.Component}
 */
export class EditRecipe extends React.Component {
  /**
   * @description Creates an instance of EditRecipe.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof EditRecipe
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      description: '',
      recipeImage: '',
      newImage: '',
      updating: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }


  /**
   * @description Get's a recipe
   *
   * @method
   *
   * @memberof EditRecipe
   *
   * @returns {void}
   */
  componentDidMount() {
    const recipeId = this.props.match.params.id;
    this.props.getRecipeDetails(recipeId);
  }


  /**
   * @description Sets state
   *
   * @param {object} nextProps
   *
   * @memberof EditRecipe
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const {
      id, name, description, ingredients, recipeImage
    } = nextProps.singleRecipe;
    this.setState({
      id, name, description, ingredients, recipeImage
    });
  }


  /**
   * @description Bind the value of the inputs to state
   *
   * @method onChange
   *
   * @param {object} event
   *
   * @memberof EditRecipe
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * @description Update's the Recipe
   *
   * @method onEdit
   *
   * @param {object} event
   *
   * @memberof EditRecipe
   *
   * @returns {void}
   */
  onEdit(event) {
    event.preventDefault();
    this.setState({
      updating: true
    });
    const {
      id, name, description, ingredients, newImage, recipeImage
    } = this.state;
    const isValid = this.isValid();
    if (isValid) {
      if (newImage) {
        this.uploadToCloudinary().then((response) => {
          const secureUrl = response.data.secure_url;
          this.props.updateRecipe(
            {
              name, description, ingredients, recipeImage: secureUrl
            },
            id
          ).then(() => {
            this.props.history.push('/users/recipes');
          });
        });
      } else {
        this.props.updateRecipe(
          {
            name, description, ingredients, recipeImage
          },
          id
        ).then(() => {
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
   * @memberof EditRecipe
   *
   * @param {array} files
   *
   * @returns {void}
   */
  handleDrop(files) {
    this.setState({
      newImage: files[0],
      recipeImage: files[0].preview
    });
  }

  /**
   * @description Handle image upload
   *
   * @method uploadToCloudinary
   *
   * @memberof EditRecipe
   *
   * @returns {void}
   */
  uploadToCloudinary() {
    const formData = new FormData();
    formData.append('file', this.state.newImage);
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
    * @memberof EditRecipe
    *
    * @returns {boolean} true or false
    */
  isValid() {
    const { errors, isValid } = recipeValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
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
    * @memberof EditRecipe
    *
    * @returns {void}
    *
    */
  render() {
    return (
      <div>
        {
          !this.props.authenticated &&
          <Redirect to="/" />
        }

        <section className="container" id="recipes" >

          <h3 className="text-center mb-4">Edit Recipe</h3>

          <div className="row">
            <div className="col-md-12 col-sm-12">
              <form>
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
                  {
                    this.state.recipeImage &&
                    <div>
                      <img
                        src={this.state.recipeImage}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                      <h5 className="text-center">
                        Click here to upload
                      </h5>
                    </div>
                  }
                </Dropzone>

                <div className="form-group form-width">
                  <h5> Name </h5>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {
                    this.state.errors.name &&
                    <span
                      className="help-block text-danger"
                    >
                      {this.state.errors.name}
                    </span>
                  }
                </div>

                <div className="form-group form-width">
                  <h5> Ingredients </h5>
                  <input
                    type="text"
                    className="form-control"
                    name="ingredients"
                    value={this.state.ingredients}
                    onChange={this.onChange}
                  />
                  {
                    this.state.errors.ingredients &&
                    <span
                      className="help-block text-danger"
                    >
                      {this.state.errors.ingredients}
                    </span>
                  }
                </div>

                <div className="form-group form-width">
                  <h5> Description </h5>
                  <textarea
                    type="text"
                    rows="5"
                    className="form-control"
                    id="updateDescription"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {
                    this.state.errors.description &&
                    <span
                      className="help-block text-danger"
                    >
                      {this.state.errors.description}
                    </span>
                  }
                </div>

                <div className="form-group form-width">
                  <button
                    id="editButton"
                    className="btn btn-secondary"
                    disabled={this.state.updating}
                    onClick={this.onEdit}
                  >
                    {this.state.updating ? 'Updating...' : 'Update'}
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
        </section >
      </div >
    );
  }
}


EditRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  singleRecipe: PropTypes.shape({}).isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};


const mapStateToProps = state => ({
  singleRecipe: state.recipes.singleRecipe,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(getSingleRecipe(id)),
  updateRecipe: (recipe, id) => dispatch(editRecipe(recipe, id))
});

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
export { ConnectedComponent as ConnectedEditRecipe };

