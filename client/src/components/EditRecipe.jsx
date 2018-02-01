import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      description: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
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
      id, name, description, ingredients
    } = nextProps.singleRecipe;
    this.setState({
      id, name, description, ingredients
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
 *@returns {josn} updates the recipe
 * @param {any} event
 * @memberof EditRecipe
 */
  onEdit(event) {
    event.preventDefault();
    const {
      id, name, description, ingredients
    } = this.state;
    this.props.updateRecipe({ name, description, ingredients, }, id);
    this.props.history.push('/users/recipes');
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
        <section className="section">

          <h3 className="text-center bottom">Edit Recipe</h3>


          <form className="form-horizontal">

            <div className="form-group">
              Name
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              Ingredients
              <input
                type="text"
                className="form-control"
                name="ingredients"
                value={this.state.ingredients}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              Description
              <textarea
                type="text"
                rows="5"
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <div className="container text-center">
              <button
                className="btn btn-primary fa fa-pencil"
                style={{ marginRight: '20px' }}
                onClick={this.onEdit}
              >Update Recipe
              </button>
            </div>
          </form>
        </section>
      </div >

    );
  }
}


EditRecipe.propTypes = {
  match: PropTypes.objectOf.isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};


const mapStateToProps = state => ({
  singleRecipe: state.recipes.singleRecipe
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(getSingleRecipe(id)),
  updateRecipe: (recipe, id) => dispatch(editRecipe(recipe, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
