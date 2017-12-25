import React from 'react';
import { Link } from 'react-router-dom';

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
          <Link className="btn btn-outline-primary" style={{ marginRight: '10px' }} to={`/SingleRecipe/${props.id}`}>Details</Link>

          <button type="button" className="btn btn-outline-primary"style={{ marginRight: '10px' }} >
            <i className="fa fa-pencil" /> Edit
          </button>

          <button type="button" className="btn btn-danger">
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default UserRecipeCard;
