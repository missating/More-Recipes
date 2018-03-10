import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


// actions
import getSingleRecipe from '../../actions/getSingleRecipe';
import addFavourite from '../../actions/addFavourite';
import voteRecipe from '../../actions/voteRecipe';

// components
import ActionButtons from '../common/ActionButtons';
import { ConnectedAddReview } from '../reviews/AddReview';
import ViewReviews from '../reviews/ViewReviews';

/**
 * @description Creates SingleRecipe component
 *
 * @class SingleRecipe
 *
 * @extends {React.Component}
 */
export class SingleRecipe extends React.Component {
  /**
   * @description Creates an instance of SingleRecipe.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof SingleRecipe
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      singleRecipe: {},
      reviews: []
    };
    this.onFavourite = this.onFavourite.bind(this);
    this.onUpvote = this.onUpvote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
  }


  /**
   * @description Gets a single recipe
   *
   * @method
   *
   * @memberof SingleRecipe
   *
   * @returns {void}
   */
  componentDidMount() {
    const recipeId = this.props.match.params.id;
    this.props.recipe(recipeId);
  }

  /**
   * @description Set state
   *
   * @param {object} nextProps
   *
   * @memberof SingleRecipe
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const singleRecipe = (nextProps.singleRecipe) ? (
      nextProps.singleRecipe) : {};
    const reviews = (singleRecipe.Reviews) ? (singleRecipe.Reviews) : [];
    this.setState({ singleRecipe, reviews });
  }

  /**
    * @description Favourites a recipe with the it's Id
    *
    * @method onFavourite
    *
    * @memberof SingleRecipe
    *
    * @returns {void}
    */
  onFavourite() {
    const recipeId = this.props.singleRecipe.id;
    this.props.favourite(recipeId);
  }

  /**
    * @description Upvotes a recipe with the it's Id
    *
    * @method onUpvote
    *
    * @memberof SingleRecipe
    *
    * @returns {void}
    */
  onUpvote() {
    const recipeId = this.props.singleRecipe.id;
    this.props.upvote(recipeId, 'upvote');
  }

  /**
   * @description Downvotes a recipe with the it's Id
   *
   * @method onDownVote
   *
   * @memberof SingleRecipe
   *
   * @returns {void}
   */
  onDownVote() {
    const recipeId = this.props.singleRecipe.id;
    this.props.upvote(recipeId, 'downvote');
  }


  /**
     * @description Renders react component
     *
     * @method render
     *
     * @memberof SingleRecipe
     *
     * @returns {void}
     *
     */
  render() {
    const { singleRecipe } = this.props;
    if (Object.keys(singleRecipe).length === 0) {
      return <Redirect to="/not-found" />;
    }

    if (singleRecipe.singleRecipe && !singleRecipe.singleRecipe.name) {
      return (
        <div className="loader-container">
          <div className="loader" />
        </div>
      );
    }

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
                  <button
                    id="onDownvote"
                    className="btn active"
                    onClick={this.onDownVote}
                  >
                    <span>
                      <i className="far fa-thumbs-down" />
                    </span>
                    {this.props.singleRecipe.downvote}
                  </button>

                  <button
                    id="onUpvote"
                    className="btn active"
                    onClick={this.onUpvote}
                  >
                    <span>
                      <i className="far fa-thumbs-up" />
                    </span>
                    {this.props.singleRecipe.upvote}
                  </button>

                  <button
                    id="onFavourite"
                    className="btn active"
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
              <p className="reviews p-3">
                {this.props.singleRecipe.description}
              </p>
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
                <ConnectedAddReview recipeId={this.props.singleRecipe.id} />
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
  singleRecipe: PropTypes.shape({
    id: PropTypes.number,
    recipeImage: PropTypes.string,
    name: PropTypes.string,
    ingredients: PropTypes.string,
    description: PropTypes.string,
    favourite: PropTypes.number,
    upvote: PropTypes.number,
    downvote: PropTypes.number
  }),
  recipe: PropTypes.func.isRequired,
  upvote: PropTypes.func.isRequired,
  favourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
};

SingleRecipe.defaultProps = {
  singleRecipe: {}
};


const mapStateToProps = state => ({
  singleRecipe: state.recipes.singleRecipe,
  authenticated: state.auth.isAuthenticated,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  recipe: id => dispatch(getSingleRecipe(id)),
  favourite: recipeId => dispatch(addFavourite(recipeId)),
  upvote: (recipeId, queryType) => dispatch(voteRecipe(recipeId, queryType))
});

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
export { ConnectedComponent as ConnectedSingleRecipe };

