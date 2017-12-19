import React from 'react';
import { Link } from 'react-router-dom';
import seven from '../assets/seven.jpg';

/**
 *
 *
 * @class RecipeCard
 * @extends {React.Component}
 */
class RecipeCard extends React.Component {
  /**
 *
 *
 * @class RecipeCard
 * @extends {React.Component}
 */
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header">{this.props.name}</div>
          <div className="card-main">
            <img src={seven} alt="..." className="img-thumbnail"/>
            <div className="main-description">
              <p>{this.props.descriptions} </p>
            </div>

            <div className="mainBtn">
              <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true" /></span> {this.props.downvote}</button>

              <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true" /></span> {this.props.upvote}</button>

              <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true" /></span> 10</button>
            </div>
            <Link className="btn btn-outline-primary" to={`/SingleRecipe/${this.props.id}`}>Details</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
