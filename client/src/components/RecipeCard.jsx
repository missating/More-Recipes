import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const RecipeCard = props => (
  <div>
    <div className="card">
      <img src={props.recipeImage}
        alt={props.recipeImage}
        className="image-width"
      />
      <div className="container p-3 recipedetails-column">
        <h2>{props.name}</h2>
        <p><small>{props.description}</small></p>
        <div className="center-button">
          <Link
            className="btn btn-secondary"
            to={`/recipes/view/${props.id}`}
          >
            CHECK IT OUT
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
