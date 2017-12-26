import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchSingleRecipe from '../actions/singleRecipe';
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
      toggleEdit: true
    };
    this.onChange = this.onChange.bind(this);
    this.onToggleEdit = this.onToggleEdit.bind(this);
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
 *@returns {json} with the new edited recipe
 * @param {any} event
 * @memberof EditRecipe
 */
  onToggleEdit(event) {
    event.preventDefault();
    this.setState({ toggleEdit: !this.state.toggleEdit });
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

          {
            this.props.singleRecipe.editRecipeSuccess &&
              <div className="alert alert-success alert-dismissible"
                role="alert">
            Recipe Updated
                {/* <Redirect to={`/SingleRecipe/${this.props.singleRecipe.id}`}/> */}
              </div>
          }

          <form className="form-horizontal">

            <div className="form-group">
              <label htmlFor="recipeName">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                disabled={this.state.toggleEdit}
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipeDescription">Ingredients</label>
              <input
                type="text"
                className="form-control"
                name="ingredients"
                value={this.state.ingredients}
                onChange={this.onChange}
                disabled={this.state.toggleEdit}
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipeingredients">Description</label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                disabled={this.state.toggleEdit}
              />
            </div>

            <div className="container text-center">
              <button
                className="btn btn-primary fa fa-pencil"
                style={{ marginRight: '20px' }}
                onClick={this.onEdit}
              >Update Recipe</button>

              <button
                className="btn btn-success fa fa-check"
                onClick={this.onToggleEdit}
              >Edit Recipe</button>
            </div>
          </form>
        </section>
      </div>

    );
  }
}


EditRecipe.propTypes = {
  match: PropTypes.object.isRequired,
  singleRecipe: PropTypes.object.isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired
};

EditRecipe.defaultProps = {
  getRecipeDetails: {},
  singleRecipe: false
};

const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe,
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(fetchSingleRecipe(id)),
  updateRecipe: (recipe, id) => dispatch(editRecipe(recipe, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
