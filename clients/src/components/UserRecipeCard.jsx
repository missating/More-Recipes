import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// image
import eleven from '../assets/eleven.jpg';


const UserRecipeCard = (props) => (
  <div>
    <div className="card">
      <div className="card-header">{props.name}</div>
      <div className="card-main">
        <img src={eleven} alt="Recipe Image" className="img-thumbnail" />
        <div className="main-description">
          <p> {props.description} </p>
        </div>
        <div className="container text-center">
          <Link className="btn btn-outline-primary"
            style={{ marginRight: '10px' }}
            to={`/SingleRecipe/${props.id}`}>
          Details
          </Link>

          <Link className="btn btn-outline-primary"
            style={{ marginRight: '10px' }}
            to={`/recipe/edit/${props.id}`}>
            Edit
          </Link>

          <button type="button" className="btn btn-danger">
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

UserRecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default UserRecipeCard;
