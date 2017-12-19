import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// image
import prof from '../assets/prof.jpg';

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
      <div>
        <div className="container userButtons">
          <div className="row">
            <div className="col-md-4">
              <Link className="btn btn-outline-primary" to="">Add Recipe</Link>
            </div>
            <div className="col-md-4">
              <Link className="btn btn-outline-primary" to="">My Recipes</Link>
            </div>
            <div className="col-md-4">
              <Link className="btn btn-outline-primary" to="">My Favourite Recipes</Link>
            </div>
          </div>
        </div>

        <section className="section bord2" id="profile">
          <div className="container">
            <div className="row text-center bord">
              <div className="col-md-12">

                <img src={prof} className="rounded mx-auto d-block" alt="..."/>

                <strong> Full Name </strong>
                <p>{this.props.userDetails.fullname}</p>

                <strong> Username </strong>
                <p> {this.props.userDetails.username} </p>

                <strong> Email </strong>
                <p> {this.props.userDetails.email}</p>

                <strong> Joined </strong>
                <p> {this.props.userDetails.joined} </p>

                <div className="container">
                  <a><i className="btn btn-primary fa fa-pencil"> Edit </i></a>
                  <a><i className="btn btn-success fa fa-check"> Update </i></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Profile.propTypes = {
  receiveUserProfile: PropTypes.func.isRequired,
  userDetails: PropTypes.shape()
};

const mapStateToProps = state => ({
  userDetails: state.userProfile
});

const mapDispatchToProps = dispatch => ({
  receiveUserProfile: () => dispatch(receiveUserProfileRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
