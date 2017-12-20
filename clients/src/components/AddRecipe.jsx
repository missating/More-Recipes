import React from 'react';
import { connect } from 'react-redux';

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
      name: '',
      ingredients: '',
      description: '',
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
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 *
 * @returns {boolean} boolean
 * @memberof AddRecipe
 */
  isValid() {
    const { errors, isValid } = recipeValidator(this.state);
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
    if (!this.isValid()) {
      return;
    }
    this.props.dispatch(addRecipe(this.state));
  }
  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof AddRecipe
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <section className="section" id="add">

          <h3 className="text-center bottom">Add New Recipe</h3>

          <div className="row">
            <div className="col-md-12">

              <form method="" className="form-horizontal" onSubmit={this.onSubmit}>

                <div className="form-group">
                  <input type="text" name="name" className="form-control" placeholder="Recipe Name"
                    value={this.state.name}
                    onChange={this.onChange} />
                  {errors.name && <span className="help-block">{errors.name}</span>}
                </div>


                <div className="form-group">
                  <input type="text" name="ingredients" className="form-control" placeholder="Ingredients"
                    value={this.state.ingredients}
                    onChange={this.onChange} />
                  {errors.ingredients && <span className="help-block">{errors.ingredients}</span>}
                </div>

                <div className="form-group">
                  <textarea
                    type="text"
                    rows="5"
                    id="recipeDescription"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && <span className="help-block">{errors.description}</span>}
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

export default connect(null)(AddRecipe);
