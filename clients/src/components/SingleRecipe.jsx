import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// image
import eleven from '../assets/eleven.jpg';

// actions
import fetchSingleRecipe from '../actions/singleRecipe';

/**
 *
 *
 * @class SingleRecipe
 * @extends {React.Component}
 */
class SingleRecipe extends React.Component {
  /**
   *
   *
   * @memberof SingleRecipe
   */
  componentWillMount() {
    const recipeId = this.props.match.params.id;
    this.props.getRecipeDetails(recipeId);
  }
  /**
 *
 *
 * @returns
 * @memberof SingleRecipe
 */
  render() {
    let allReviews;
    let ingredientsList;
    if (this.props.singleRecipe.ingredients) {
      if (this.props.singleRecipe.ingredients) {
        ingredientsList = this.props.singleRecipe.ingredients.split(',').map((item, index) => (<li className="list-group-item" key={index}>{item}</li>));
      }

      const reviews = (this.props.singleRecipe.Reviews) ? (this.props.singleRecipe.Reviews) : [];
      allReviews = reviews.map((review, i) => (
        <p key={`review ${review.id}`}>
          {review.User.fullname} : {review.content}
        </p>
      ));
    }
    return (
      <div>
        <section className="container text-center" id="oneRecipe">
          <h3 className="styles">{this.props.singleRecipe.name}</h3>
          <div className="row">
            <div className="col-md-12">
              <img src={eleven} alt="Recipe Image" className="img-thumbnail" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>Ingredients</h4>
              <ul className="list-group">
                { ingredientsList }
              </ul>

              <h4>Direction for cooking</h4>
              <p>{this.props.singleRecipe.description}</p>

              <div className="mainBtn">
                <button className="btn btn-danger" style={{ margin: '5px' }}>
                  <span><i className="fa fa-thumbs-down" aria-hidden="true" /></span>
                  {this.props.singleRecipe.downvote}
                </button>
                <button className="btn btn-success" style={{ margin: '5px' }}>
                  <span><i className="fa fa-thumbs-up" aria-hidden="true" /></span>
                  {this.props.singleRecipe.upvote}
                </button>
              </div>
            </div>
          </div>
          <div className="container top">
            <div className="row">
              <div className="col-md-12">
                <h4 className="text-center"> Reviews </h4>
                <div>{ allReviews }</div>
                <p> To add review, You must <Link to="/Home">Sign In</Link></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(fetchSingleRecipe(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
