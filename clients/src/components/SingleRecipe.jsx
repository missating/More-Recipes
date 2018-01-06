import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// image
import eleven from '../assets/eleven.jpg';

// actions
import fetchSingleRecipe from '../actions/singleRecipe';
import addFavourite from '../actions/addFavourite';

// components
import ActionButtons from './ActionButtons';
import AddReview from './AddReview';

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
      recipe: {},
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
    this.props.getRecipeDetails(recipeId);
  }
  /**
 *
 *@returns {json} with the id of favourite recipe
 * @memberof SingleRecipe
 */
  onFavourite() {
    const recipeId = this.props.match.params.id;
    this.props.favourite(recipeId);
  }
  /**
 *
 *
 * @return {jsx} - a list of items to be rendered
 * @memberof SingleRecipe
 */
  render() {
    let allReviews;
    let ingredientsList;
    if (this.props.singleRecipe.ingredients) {
      if (this.props.singleRecipe.ingredients) {
        ingredientsList = this.props.singleRecipe.ingredients.split(',')
          .map((item, index) =>
            (<li className="list-group-item" key={index}>{item}</li>));
      }

      const reviews = (this.props.singleRecipe.Reviews) ?
        (this.props.singleRecipe.Reviews) : [];
      allReviews = reviews.map((review, i) => (
        <p key={`review ${review.id}`}>
          {review.User.fullname} : {review.content}
        </p>
      ));
    }

    let addFavouriteError;
    if (this.props.singleRecipe.errorMessage) {
      addFavouriteError = (
        <div className="alert alert-danger alert-dismissible">
          {this.props.singleRecipe.errorMessage}
        </div>
      );
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

              {
                !this.props.authenticated &&
                  <ActionButtons />
              }
              {
                this.props.authenticated &&
                <div className="mainBtn">

                  {addFavouriteError}

                  <button className="btn btn-outline-danger"
                    style={{ margin: '5px' }}>
                    <span>
                      <i className="fa fa-thumbs-down"
                        aria-hidden="true" />
                    </span>
                    {this.props.singleRecipe.downvote}
                  </button>

                  <button className="btn btn-outline-success"
                    style={{ margin: '5px' }}>
                    <span>
                      <i className="fa fa-thumbs-up"
                        aria-hidden="true" />
                    </span>
                    {this.props.singleRecipe.upvote}
                  </button>
                  {
                    this.props.singleRecipe.errorMessage === "" &&
                <div className="alert alert-success alert-dismissible"
                  role="alert">
                      Recipe Favourited
                </div>
                  }
                  <button className="btn btn-outline-danger"
                    onClick={this.onFavourite}>
                    <span>
                      <i className="fa fa-heart" />
                    </span>
                    {this.props.singleRecipe.favourite}
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="container top">
            <div className="row">
              <div className="col-md-12">
                <h4 className="text-center"> Reviews </h4>
                <div>{ allReviews }</div>
                {this.props.authenticated && <AddReview recipeId={this.props.match.params.id} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SingleRecipe.propTypes = {
  singleRecipe: PropTypes.object.isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  favourite: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

SingleRecipe.defaultProps = {
  singleRecipe: ''
};

const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe,
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: id => dispatch(fetchSingleRecipe(id)),
  favourite: recipeId => dispatch(addFavourite(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
