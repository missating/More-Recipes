import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeGallery = props => (
  <div>
    <div className="zoom-container">
      <Link to={`/recipes/view/${props.id}`}>
        <span className="zoom-caption">
          <span>
            {props.name}
            <br />
            <small> {props.ingredients} </small>
          </span>
        </span>
        <img src={props.recipeImage} alt={props.name} />
      </Link>
    </div>
  </div>
);

RecipeGallery.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired
};

export default RecipeGallery;
