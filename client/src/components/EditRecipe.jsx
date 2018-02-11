import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Link, Redirect } from 'react-router-dom';

// action
import getSingleRecipe from '../actions/getSingleRecipe';
import editRecipe from '../actions/editRecipe';


/**
 *
 *
 * @class UpdateRecipe
 * @extends {React.Component}
 */
class EditRecipe extends React.Component {
  /**
   * Creates an instance of EditRecipe.
   * @param {any} props
   * @memberof EditRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      description: '',
      recipeImage: '',
      newImage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }
  /**
 *
 *@returns {json} with recipe details
 * @memberof EditRecipe
 */
  componentDidMount() {
    const recipeId = this.props.match.params.id;
    this.props.getRecipeDetails(recipeId);
  }
  /**
 *
 *@returns {json} with the new recipe details
 * @param {any} nextProps
 * @memberof EditRecipe
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
 *
 *@returns {json} with the new recipe name
 * @param {any} event
 * @memberof EditRecipe
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 *@returns {json} updates the recipe
 * @param {any} event
 * @memberof EditRecipe
 */
  onEdit(event) {
    event.preventDefault();
    const {
      id, name, description, ingredients, newImage, recipeImage
    } = this.state;
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

  /**
  * Handle image drop
  * @param {array} files
  * @returns {null} null
  */
  handleDrop(files) {
    this.setState({
      newImage: files[0],
      recipeImage: files[0].preview
    });
  }

  /**
  * Handle image upload
  * @returns {null} null
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
   * @description react render method
   *
   * @returns {component} react component
   * @memberof EditRecipe
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
                  {/* {!newRecipe.recipeImage.preview &&
                    <div>
                      <img
                        src={defaultImg}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                      <h5 className="text-center">Click here to upload</h5>
                    </div>
                  } */}
                  {
                    this.state.recipeImage &&
                    <div>
                      <img
                        src={this.state.recipeImage}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                      <h5 className="text-center">Click here to upload</h5>
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
                </div>

                <div className="form-group form-width">
                  <h5> Description </h5>
                  <textarea
                    type="text"
                    rows="5"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group form-width">
                  <button
                    className="btn btn-secondary"
                    onClick={this.onEdit}
                  >
                    Update Recipe
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
  match: PropTypes.objectOf.isRequired,
  singleRecipe: PropTypes.objectOf.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
