import React from 'react';
import { Link } from 'react-router-dom';

// image
import thirteen from '../assets/thirteen.jpg';

/**
 *
 *
 * @class RecipeGallery
 * @extends {React.Component}
 */
class RecipeGallery extends React.Component {
  /**
   *
   *
   *@returns {null} null
   * @memberof RecipeGallery
   */
  render() {
    return (
      <div>
        <div className="zoom-container">
          <Link to={`/SingleRecipe/${this.props.id}`} >
            <span className="zoom-caption">
              <span>{this.props.name}<br/>
                <small> {this.props.ingredients} </small>
              </span>
            </span>
            <img src={thirteen} />
          </Link>
        </div>

        <div className="mainBtn" style={{ marginLeft: '95px' }}>
          <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true" /></span> {this.props.downvote}</button>
          <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true" /></span> {this.props.upvote}</button>
          <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true" /></span> 10</button>
        </div>
      </div>
    );
  }
}

export default RecipeGallery;
