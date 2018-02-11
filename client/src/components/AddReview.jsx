import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import addReview from '../actions/addReview';
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
      content: ''
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
    const { content } = this.state;
    const { recipeId } = this.props;
    event.preventDefault();
    this.props.addNewReview(content, recipeId)
      .then(() => {
        this.setState({
          content: ''
        });
      });
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

