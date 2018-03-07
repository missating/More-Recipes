import React from 'react';
import PropTypes from 'prop-types';


const ActionButtons = props => (
  <div className="container">

    <button className="btn disabled">
      <span>
        <i className="far fa-thumbs-up" />
      </span>
      {props.singleRecipe.downvote}
    </button>

    <button className="btn disabled">
      <span>
        <i className="fa fa-thumbs-down" />
      </span>
      {props.singleRecipe.upvote}
    </button>

    <button className="btn disabled">
      <span>
        <i className="far fa-heart" />
      </span>
      {props.singleRecipe.favourite}
    </button>
  </div>
);

ActionButtons.propTypes = {
  singleRecipe: PropTypes.shape({
    favourite: PropTypes.number,
    upvote: PropTypes.number,
    downvote: PropTypes.number
  }).isRequired
};

export default ActionButtons;

