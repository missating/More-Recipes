import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import deleteRecipe from '../actions/deleteRecipe';

const UserRecipeCard = props => (

  <div>
    <div className="card">
      <img src={props.recipeImage}
        alt={props.recipeImage}
        className="image-width"
      />

      <div className="container p-3 recipedetails-column">
        <h2>{props.name}</h2>
        <p><small>{props.description}</small></p>
        <div className="container">
          <Link
            className="btn btn-secondary recipe-button"
            to={`/recipes/view/${props.id}`}
          >
            DETAILS
         </Link>

          <Link
            className="btn btn-secondary recipe-button"
            to={`/recipe/edit/${props.id}`}
          >
            EDIT
          </Link>

          <button className="btn"
            onClick={() => { props.deleteRecipe(props.id); }}
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

UserRecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteRecipe: (recipeId) => {
    dispatch(deleteRecipe(recipeId));
  }
});

export default connect(null, mapDispatchToProps)(UserRecipeCard);
