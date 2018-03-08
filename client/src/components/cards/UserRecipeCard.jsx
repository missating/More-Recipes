import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';

// actions
import deleteRecipe from '../../actions/deleteRecipe';
/**
 * Creates UserRecipeCard component
 * @class UserRecipeCard
 * @extends {React.Component}
 */
export class UserRecipeCard extends React.Component {
  /**
   * Creates an instance of UserRecipeCard.
   * @param {any} props
   * @memberof UserRecipeCard
   */
  constructor(props) {
    super(props);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
  }
  /**
   * Deletes a recipe after confirming
   * @method onDeleRecipe
   * @param {any} event
   * @return {void}
   * @memberof UserRecipeCard
   */
  onDeleteRecipe() {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this recipe ?',
      confirmLabel: 'Yes, delete!',
      cancelLabel: 'Cancel',
      onConfirm: () =>
        this.props.deleteRecipe(this.props.id),
    });
  }
  /**
   * Renders react component
   * @method render
   * @returns {void}
   * @memberof  UserRecipeCard
   */
  render() {
    return (
      <div className="flex">

        <div className="card">
          <Link to={`/recipes/view/${this.props.id}`} className="hover">
            <img
              src={this.props.recipeImage}
              alt={this.props.recipeImage}
              className="image-width"
            />
          </Link>
          <div className="container p-3 recipedetails-column">
            <h2>{this.props.name}</h2>
            <p><small>{this.props.description}</small></p>
            <div className="container">
              <Link
                className="btn btn-secondary recipe-button"
                id="viewRecipe"
                to={`/recipes/view/${this.props.id}`}
              >
                VIEW
              </Link>

              <Link
                className="btn btn-secondary recipe-button"
                id="editRecipe"
                to={`/recipe/edit/${this.props.id}`}
              >
                EDIT
              </Link>

              <button
                id="deleteButton"
                className="btn"
                onClick={this.onDeleteRecipe}
              >
                <span>
                  <i className="far fa-trash-alt" />
                </span>
              </button>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

UserRecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteRecipe: (recipeId) => {
    dispatch(deleteRecipe(recipeId));
  }
});

const ConnectedComponent =
  connect(null, mapDispatchToProps)(UserRecipeCard);
export { ConnectedComponent as ConnectedUserRecipeCard };

