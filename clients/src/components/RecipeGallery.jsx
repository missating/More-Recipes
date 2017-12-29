import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// image
import thirteen from '../assets/thirteen.jpg';

const RecipeGallery = (props) => (

  <div>
    <div className="zoom-container">
      <Link to={`/SingleRecipe/${props.id}`} >
        <span className="zoom-caption">
          <span>{props.name}<br/>
            <small> {props.ingredients} </small>
          </span>
        </span>
        <img src={thirteen} />
      </Link>
    </div>
  </div>
);

RecipeGallery.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  upvote: PropTypes.number.isRequired,
  downvote: PropTypes.number.isRequired
};

export default RecipeGallery;
