import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const RecipeCard = props => (
  <div>
    <div className="card">
      <div className="card-header">{props.name}</div>
      <div className="card-main">
        <img
          src={props.recipeImage}
          alt={props.recipeImage}
          className="img-thumbnail"
        />
        <div className="main-description">
          <p>{props.description} </p>
        </div>
        <div className="mainBtn">
          <Link
            className="btn btn-outline-primary"
            to={`/recipes/view/${props.id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  </div>
);


RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired
};

export default RecipeCard;
