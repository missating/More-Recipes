import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// image
import eleven from '../assets/eleven.jpg';

// actions
import receiveSingleRecipeRequest from '../actions/singleRecipe';

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
  componentDidMount() {
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
    console.log('single recipe', this.props.recipeDetails);
    let ingredientsList;
    if (this.props.recipeDetails.ingredients) {
      ingredientsList = this.props.recipeDetails.ingredients.split(',').map((item, index) => (<li className="list-group-item" key={index}>{item}</li>));
      console.log(ingredientsList);
    }

    const reviews = (this.props.recipeDetails.Reviews) ? (this.props.recipeDetails.Reviews) : [];
    const allReviews = reviews.map((review, i) => (
      <p key={'review ' + `${review.id}`}>
        {review.content}
      </p>
    ));

    return (
      <div>
        <section className="container text-center" id="oneRecipe">
          <h3 className="styles">{this.props.recipeDetails.name}</h3>
          <div className="row">
            <div className="col-md-12">
              <img src={eleven} alt="Recipe Image" className="img-thumbnail" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>Ingredients</h4>
              <ul className="list-group">
                {ingredientsList}
              </ul>

              <h4>Direction for cooking</h4>
              <p>{this.props.recipeDetails.description}</p>

              <div className="mainBtn">
                <button className="btn btn-danger" style={{ margin: '5px' }}>
                  <span><i className="fa fa-thumbs-down" aria-hidden="true" /></span>
                  {this.props.recipeDetails.downvote}
                </button>
                <button className="btn btn-success" style={{ margin: '5px' }}>
                  <span><i className="fa fa-thumbs-up" aria-hidden="true" /></span>
                  {this.props.recipeDetails.upvote}
                </button>
              </div>
            </div>
          </div>
          <div className="container top">
            <div className="row">
              <div className="col-md-12">
                <h4 className="text-center"> Reviews </h4>
                <div>{allReviews}</div>
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
  recipeDetails: state.singleRecipe
});
const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(receiveSingleRecipeRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
