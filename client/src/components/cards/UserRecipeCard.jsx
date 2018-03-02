import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';

// actions
import deleteRecipe from '../../actions/deleteRecipe';
/**
 *
 *
 * @class UserRecipeCard
 * @extends {React.Component}
 */
class UserRecipeCard extends React.Component {
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
   *
   *
   * @memberof UserRecipeCard
   */
  onDeleteRecipe() {
    confirmAlert({
      message: 'Are you sure you want to delete this recipe ?',
      confirmLabel: 'Yes, delete!',
      cancelLabel: 'Cancel',
      onConfirm: () =>
        this.props.deleteRecipe(this.props.id),
    });
  }
  /**
   *
   *
   * @returns {JSX} react component
   * @memberof UserRecipeCard
   */
  render() {
    return (
      <div className="flex">
        <div className="card">
          <img
            src={this.props.recipeImage}
            alt={this.props.recipeImage}
            className="image-width"
          />

          <div className="container p-3 recipedetails-column">
            <h2>{this.props.name}</h2>
            <p><small>{this.props.description}</small></p>
            <div className="container">
              <Link
                className="btn btn-secondary recipe-button"
                to={`/recipes/view/${this.props.id}`}
              >
                VIEW
              </Link>

              <Link
                className="btn btn-secondary recipe-button"
                to={`/recipe/edit/${this.props.id}`}
              >
                EDIT
              </Link>

              <button
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

export default connect(null, mapDispatchToProps)(UserRecipeCard);
