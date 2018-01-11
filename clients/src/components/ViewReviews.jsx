import React from 'react';
import PropTypes from 'prop-types';

const ViewReviews = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-8">
        <div className="content">
          <p> <strong> {`${props.user}`} </strong> </p>
          <p> <small> {props.content} </small> </p>
          <p> <small id="review-date"> {props.created} </small> </p>
        </div>
      </div>
    </div>
  </div>
);

ViewReviews.propTypes = {
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired
};

export default ViewReviews;
