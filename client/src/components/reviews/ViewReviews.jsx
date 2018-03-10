import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';

const ViewReviews = props => (
  <div className="container">
    <div className="image">
      <Gravatar
        className="img rounded"
        email={props.email}
      />
    </div>
    <p> {props.content} </p>
    <h6>
      <em> {props.user}</em>
      <small> - {props.created} </small>
    </h6>
    <hr />
  </div>
);

ViewReviews.propTypes = {
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired
};

export default ViewReviews;
