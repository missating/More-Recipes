import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import deleteRecipe from '../actions/deleteRecipe';

const UserRecipeCard = props => (

  <div>
    <div className="card">
      <img src={props.recipeImage} alt={props.name} className="card-img-top" />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">{props.ingredients}</p>

        <Link
          className="btn btn-outline-primary"
          style={{ marginRight: '10px' }}
          to={`/recipes/view/${props.id}`}
        >
          Details
        </Link>

        <Link
          className="btn btn-outline-primary"
          style={{ marginRight: '10px' }}
          to={`/recipe/edit/${props.id}`}
        >
          Edit
        </Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => { props.deleteRecipe(props.id); }}
        >
          <i className="fa fa-trash" />
        </button>
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
