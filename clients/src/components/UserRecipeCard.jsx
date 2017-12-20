import React from 'react';
import { Link } from 'react-router-dom';

// image
import eleven from '../assets/eleven.jpg';


const UserRecipeCard = (props) => (
  <div>
    <img src={eleven} alt="Recipe Image" className="img-thumbnail" />

    <h5><Link to={`/SingleRecipe/${props.id}`}>{props.name}</Link></h5>
    <p />{props.descriptions}
    <button type="button" className="btn btn-outline-info">Edit</button>
    <button type="button" className="btn btn-outline-danger">Delete</button>
  </div>
);

export default UserRecipeCard;
