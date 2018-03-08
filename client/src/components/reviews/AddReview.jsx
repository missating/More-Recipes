import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// validations
import reviewValidator from '../../validation/reviewValidator';

// actions
import addReview from '../../actions/addReview';

/**
 * @description Creates AddReview component
 *
 * @class AddReview
 *
 * @extends {React.Component}
 */
export class AddReview extends React.Component {
  /**
   * @description Creates an instance of AddReview.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof AddReview
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
  * @description Bind the value of the inputs to state
  *
  * @method onChange
  *
  * @param {object} event
  *
  * @memberof AddReview
  *
  * @returns {void}
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * @description Submit the form
   *
   * @method onSubmit
   *
   * @param {object} event
   *
   * @memberof AddReview
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { content } = this.state;
    const { recipeId } = this.props;
    const isValid = this.isValid();
    if (isValid) {
      this.props.addNewReview(content, recipeId)
        .then(() => {
          this.setState({
            content: ''
          });
        });
    }
  }


  /**
    * @description Validates user's data before making post request
    *
    * @method isValid
    *
    * @memberof AddReview
    *
    * @returns {boolean} true or false
    */
  isValid() {
    const { errors, isValid } = reviewValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    } else {
      this.setState({ errors: {} });
      return isValid;
    }
  }


  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof AddReview
   *
   * @returns {void}
   *
   */
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <textarea
            className="form-control"
            name="content"
            id="reviewContent"
            rows="4"
            cols="30"
            placeholder="Add a review..."
            onChange={this.onChange}
            value={this.state.content}
          />
          {
            this.state.errors.content &&
            <span
              id="reviewError"
              className="help-block text-danger"
            >
              {this.state.errors.content}
            </span>
          }

          <br />
          <button
            id="submitReview"
            className="btn btn-secondary"
            style={{ float: 'right' }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}
AddReview.propTypes = {
  recipeId: PropTypes.number.isRequired,
  addNewReview: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  addNewReview: (content, recipeId) => dispatch(addReview(content, recipeId))
});

const ConnectedComponent = connect(null, mapDispatchToProps)(AddReview);
export { ConnectedComponent as ConnectedAddReview };

