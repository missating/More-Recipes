import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const RecipeCard = props => (
  <div className="flex">

    <div className="card">
      <Link to={`/recipes/view/${props.id}`} className="hover">
        <img
          src={props.recipeImage}
          alt={props.recipeImage}
          className="image-width"
        />
      </Link>
      <div className="container p-3 recipedetails-column">
        <h2>{props.name}</h2>
        <p><small>{props.description}</small></p>
        <div className="center-button">
          <Link
            className="btn btn-secondary"
            to={`/recipes/view/${props.id}`}
          >
            VIEW
          </Link>
          {
            props.button &&
            (
              <button
                id="removeButton"
                className="btn btn-secondary"
                onClick={() => props.onButtonClick(props.id)}
              >
                Remove
              </button>
            )

          }
        </div>
      </div>
    </div>
  </div>
);


RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  button: PropTypes.bool
};

RecipeCard.defaultProps = {
  onButtonClick: () => null,
  button: false
};

export default RecipeCard;
