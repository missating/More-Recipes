import React from 'react';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';


// actions
import receiveUserProfileRequest from '../actions/userProfile';
/**
 *
 *
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
   *
   * @returns {null} null
   * @memberof Profile
   */
  componentDidMount() {
    this.props.receiveUserProfile();
  }
  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof Profile
   */
  render() {
    return (
      <div className="container">
        <div className="sidenav">
          <Link
            className="btn btn-secondary"
            to="/recipe/add"
          >
            Add Recipe
              </Link>

          <Link
            className="btn btn-secondary"
            to="/users/recipes"
          >
            My Recipes
              </Link>

          <Link
            className="btn btn-secondary"
            to="/users/favourites"
          >
            My Favourite Recipes
              </Link>
        </div>

        <div className="container profile">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <Gravatar
                className="img-fluid mx-auto d-block"
                width="400"
                height="200"
                email={this.props.userDetails.email}
              />
            </div>

            <div className="col-md-6 col-sm-12">

              <h5 className="pt-3"> Name </h5>
              <p>{this.props.userDetails.fullname}</p>

              <h5 className="pt-3"> Username </h5>
              <p> {this.props.userDetails.username} </p>

              <h5 className="pt-3"> Email </h5>
              <p> {this.props.userDetails.email}</p>

              <h5 className="pt-3"> Joined </h5>
              <p> {this.props.userDetails.joined} </p>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  receiveUserProfile: PropTypes.func.isRequired,
  userDetails: PropTypes.objectOf.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userDetails: state.userProfile,
  authenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  receiveUserProfile: receiveUserProfileRequest
})(Profile);
