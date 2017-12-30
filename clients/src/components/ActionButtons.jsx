import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const ActionButtons = (props) => (
  <div className="mainBtn">

    <button className="btn btn-outline-danger disabled"
      style={{ margin: '5px' }}>
      <span>
        <i className="fa fa-thumbs-down" />
      </span>
      {props.singleRecipe.downvote}
    </button>

    <button className="btn btn-outline-success disabled"
      style={{ margin: '5px' }}>
      <span>
        <i className="fa fa-thumbs-up" />
      </span>
      {props.singleRecipe.upvote}
    </button>

    <button className="btn btn-outline-danger disabled">
      <span>
        <i className="fa fa-heart disabled" />
      </span>
      {props.singleRecipe.favourite}
    </button>
  </div>

);

ActionButtons.propTypes = {
  singleRecipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe,
});

export default connect(mapStateToProps, null)(ActionButtons);
