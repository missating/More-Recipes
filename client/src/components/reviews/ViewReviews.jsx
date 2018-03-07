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
    <h5> <em> {props.user}</em> </h5>
    <hr />
  </div>
);

ViewReviews.propTypes = {
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default ViewReviews;
