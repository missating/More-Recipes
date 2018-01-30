import React from 'react';
import { Link } from 'react-router-dom';

// image
import eleven from '../assets/eleven.jpg';

const UserFavouritesCard = (props) => (
  <div>
    <div className="col-md-4">
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
              to={`/recipes/view/${props.id}`}>
          Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserFavouritesCard;
