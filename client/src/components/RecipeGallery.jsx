import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeGallery = props => (
  <div>
    <div className="image-container">
      <Link to={`/recipes/view/${props.id}`}>
        <img src={props.recipeImage} alt={props.name} className="image" />
        <div className="middle">
          <div className="text">{props.name}</div>
        </div>
      </Link>
    </div>
  </div>
);

RecipeGallery.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired
};

export default RecipeGallery;
