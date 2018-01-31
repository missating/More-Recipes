import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// actions
import getSingleRecipe from '../actions/getSingleRecipe';
import addFavourite from '../actions/addFavourite';

// components
import ActionButtons from './ActionButtons';
import AddReview from './AddReview';
import ViewReviews from './ViewReviews';

/**
 *
 *
 * @class SingleRecipe
 * @extends {React.Component}
 */
class SingleRecipe extends React.Component {
  /**
 * Creates an instance of SingleRecipe.
 * @param {any} props
 * @memberof Recipe
 */
  constructor(props) {
    super(props);
    this.state = {
      singleRecipe: {},
      reviews: []
    };
    this.onFavourite = this.onFavourite.bind(this);
  }
  /**
   *
   * @returns {json} with recipe details
   * @memberof SingleRecipe
   */
  componentWillMount() {
    const recipeId = this.props.match.params.id;
    this.props.recipe(recipeId);
  }

  /**
   *
   * @return {null} null
   * @param {any} nextProps
   * @memberof Recipe
   */
  componentWillReceiveProps(nextProps) {
    const singleRecipe = (nextProps.singleRecipe) ? (
      nextProps.singleRecipe) : {};
    const reviews = (singleRecipe.Reviews) ? (singleRecipe.Reviews) : [];
    this.setState({ singleRecipe, reviews });
  }

  /**
 *
 *@returns {json} with the id of favourite recipe
 * @memberof SingleRecipe
 */
  onFavourite() {
    const recipeId = this.props.singleRecipe.id;
    this.props.favourite(recipeId);
  }
  /**
 *
 *
 * @return {jsx} - a list of items to be rendered
 * @memberof SingleRecipe
 */
  render() {
    const ingredients = (this.state.singleRecipe.ingredients) ?
      (this.state.singleRecipe.ingredients) : '';
    const ingredientsList = ingredients.split(',').map((item, i) => (
      <li className="list-group-item" key={i}>{item}</li>
    ));

    const { reviews } = this.state;
    const allReviews = reviews.map((review, i) => (
      <div key={`review ${i + 1}`} className="container">
        <ViewReviews
          user={review.User.fullname}
          content={review.content}
          created={new Date(review.createdAt).toDateString()}
        />
      </div>
    ));

    return (
      <div>
        <section className="container text-center" id="oneRecipe">
          <h3 className="styles">{this.state.singleRecipe.name}</h3>
          <div className="row">
            <div className="col-md-12">
              <img
                src={this.state.singleRecipe.recipeImage}
                alt={this.state.singleRecipe.name}
                className="img-thumbnail"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>Ingredients</h4>
              <ul className="list-group">
                {ingredientsList}
              </ul>

              <h4>Direction for cooking</h4>
              <p>{this.state.singleRecipe.description}</p>

              {
                !this.props.authenticated &&
                <ActionButtons singleRecipe={this.state.singleRecipe} />
              }
              {
                this.props.authenticated &&
                <div className="mainBtn">

                  <button
                    className="btn btn-outline-danger"
                    style={{ margin: '5px' }}
                  >
                    <span>
                      <i
                        className="fa fa-thumbs-down"
                        aria-hidden="true"
                      />
                    </span>
                    {this.state.singleRecipe.downvote}
                  </button>

                  <button
                    className="btn btn-outline-success"
                    style={{ margin: '5px' }}
                  >
                    <span>
                      <i
                        className="fa fa-thumbs-up"
                        aria-hidden="true"
                      />
                    </span>
                    {this.state.singleRecipe.upvote}
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={this.onFavourite}
                  >
                    <span>
                      <i className="fa fa-heart" />
                    </span>
                    {this.state.singleRecipe.favourite}
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="container top">
            <div className="row">
              <div className="col-md-12">
                <h4 className="text-center"> Reviews </h4>
                {this.props.authenticated &&
                  <AddReview recipeId={this.state.singleRecipe.id} />
                }
                <br />
                {
                  allReviews.length > 0 &&
                  <div>
                    {allReviews}
                  </div>
                }
                {
                  !allReviews.length &&
                  <div className="container">
                    <h2>There are currently no reviews for this recipe.</h2>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SingleRecipe.propTypes = {
  singleRecipe: PropTypes.objectOf.isRequired,
  recipe: PropTypes.func.isRequired,
  favourite: PropTypes.func.isRequired,
  match: PropTypes.objectOf.isRequired,
  authenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
  singleRecipe: state.recipes.singleRecipe,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  recipe: id => dispatch(getSingleRecipe(id)),
  favourite: recipeId => dispatch(addFavourite(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
