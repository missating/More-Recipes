import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const UserFavouritesCard = props => (
  <div>
    <div className="card">
      <img src={props.recipeImage} alt={props.name} className="card-img-top" />
      <div className="card-body" />
      <h4 className="card-title">{props.name}</h4>
      <p className="card-text">{props.ingredients}</p>

      <Link
        className="btn btn-outline-primary"
        style={{ marginRight: '10px' }}
        to={`/recipes/view/${props.id}`}
      >
        Details
      </Link>
    </div>
  </div>
);


UserFavouritesCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  recipeImage: PropTypes.string.isRequired
};

export default UserFavouritesCard;
