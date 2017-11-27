import React from 'react';
import { Link } from 'react-router-dom'
import '../css/style.css';
import thirteen from '../assets/thirteen.jpg';

class RecipeGallery extends React.Component {
  render() {
    return (
    <div>
      <div className="zoom-container">
            <Link to='/SingleRecipe'>
              <span className="zoom-caption">
                  <span>Recipe 1  <br/> 
                    <small> Rice and beans </small>
                   </span>
              </span>
              <img src={thirteen} />
            </Link>
          </div>

        <div className="mainBtn" style={{ marginLeft: '95px' }}>
            <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>
            <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>
            <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
        </div>
    </div>
    )
  }
}

export default RecipeGallery;