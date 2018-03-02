import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// validations
import reviewValidator from '../../validation/reviewValidator';

// actions
import addReview from '../../actions/addReview';
/**
 *
 *
 * @class AddReview
 * @extends {React.Component}
 */
class AddReview extends React.Component {
  /**
   * Creates an instance of AddReview.
   * @param {any} props
   * @memberof AddReview
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
   *
   * @returns {null} null
   * @param {any} event
   * @memberof AddReview
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @returns {null} null
   *
   * @param {any} event
   * @memberof AddReview
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
   *
   *
   * @returns {boolean} boolean
   * @memberof AddReview
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
   *
   *
   * @returns {jsx} form to add review
   * @memberof AddReview
   */
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <textarea
            className="form-control"
            name="content"
            rows="4"
            cols="30"
            placeholder="Add a review..."
            onChange={this.onChange}
            value={this.state.content}
          />
          {
            this.state.errors.content &&
            <span
              className="help-block text-danger"
            >
              {this.state.errors.content}
            </span>
          }

          <br />
          <button className="btn btn-secondary" style={{ float: 'right' }}>
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

export default connect(null, mapDispatchToProps)(AddReview);

