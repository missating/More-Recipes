import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

    const { reviews } = this.state;
    const allReviews = reviews.map((review, i) => (
      <div key={`review ${i + 1}`} className="container">
        <ViewReviews
          user={review.User.fullname}
          email={review.User.email}
          content={review.content}
          created={new Date(review.createdAt).toDateString()}
        />
      </div>
    ));

    return (
      <div>
        <section className="container" id="recipes">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h2 className="ml-4">{this.props.singleRecipe.name}</h2>
              <img
                src={this.props.singleRecipe.recipeImage}
                alt={this.props.singleRecipe.name}
                className="img-thumbnail"
              />
              {
                !this.props.authenticated &&
                <ActionButtons singleRecipe={this.state.singleRecipe} />
              }
              {
                this.props.authenticated &&
                <div className="container">
                  <button className="btn active">
                    <span>
                      <i className="far fa-thumbs-up" />
                    </span>
                    {this.props.singleRecipe.downvote}
                  </button>

                  <button className="btn active">
                    <span>
                      <i className="far fa-thumbs-down" />
                    </span>
                    {this.props.singleRecipe.upvote}
                  </button>

                  <button className="btn active"
                    onClick={this.onFavourite}
                  >
                    <span>
                      <i className="far fa-heart" />
                    </span>
                    {this.props.singleRecipe.favourite}
                  </button>

                </div>
              }
            </div>
            <div className="col-md-6 col-sm-12 recipe-details">
              <hr />
              <h5>Ingredients</h5>
              <p>{this.props.singleRecipe.ingredients}</p>
              <hr />
              <h5> Method </h5>
              <p>{this.props.singleRecipe.description}</p>
            </div>
          </div>

          <div className="row mt-5 recipe-details">
            <div className="col-md-6 col-sm-12 reviews">
              <h4> Reviews </h4>
              {
                allReviews.length > 0 &&
                <div>
                  {allReviews}
                </div>
              }
              {
                !allReviews.length &&
                <div className="container">
                  <p>Currently no reviews</p>
                </div>
              }
            </div>
            <div className="col-md-6 col-sm-12">
              {this.props.authenticated &&
                <AddReview recipeId={this.props.singleRecipe.id} />
              }
              {!this.props.authenticated &&
                <div>
                  <p className="ml-5"> Sign in to add a review </p>
                  <Link
                    className="btn btn-secondary ml-5"
                    to="/"
                  >
                    SIGN IN
                 </Link>
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SingleRecipe.propTypes = {
  singleRecipe: PropTypes.shape({}).isRequired,
  recipe: PropTypes.func.isRequired,
  favourite: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
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
