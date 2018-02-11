import React from 'react';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


// actions
import getUserProfile from '../actions/userProfile';
import editProfile from '../actions/editUserProfile';
/**
 *
 *
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      email: '',
      joined: '',
      disabled: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @returns {null} null
   * @memberof Profile
   */
  componentDidMount() {
    this.props.getUserDetails();
  }
  /**
  *
  *@returns {json} with the new user details
  * @param {any} nextProps
  * @memberof EditRecipe
  */
  componentWillReceiveProps(nextProps) {
    const {
      fullname, username, email, joined,
    } = nextProps.userProfile;
    this.setState({
      fullname, username, email, joined,
    });
  }
  /**
   * @returns {json} with the new use details
   *
   * @param {any} event
   * @memberof Profile
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   *
   * @memberof Profile
   */
  onEdit() {
    this.setState({ disabled: !this.state.disabled });
  }
  /**
   *@returns {json} updates the profile
   *
   * @param {any} event
   * @memberof Profile
   */
  onSubmit(event) {
    event.preventDefault();
    const { fullname, username } = this.state;
    this.props.updateProfile({
      fullname, username
    })
      .then(() => {
        this.setState({
          disabled: true
        });
      });
  }
  /**
   * @description react render methodnvg
   *
   * @returns {component} react component
   * @memberof Profile
   */
  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <div className="loader-container">
          <div className="loader" />
        </div>
      );
    }

    return (
      <div className="container profile" id="recipes">
        {
          !this.props.authenticated &&
          <Redirect to="/" />
        }

        <h3 className="text-center">Profile</h3>
        <hr />

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <Gravatar
              className="rounded mx-auto d-block mt-3"
              width="200"
              height="200"
              email={this.state.email}
            />
          </div>

          <div className="col-md-6 col-sm-12">

            <div className="form-group form-width">
              <h5 className="pt-3"> Full Name </h5>
              <input
                type="text"
                className="form-control"
                name="fullname"
                value={this.state.fullname}
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
            </div>
            <form>
              <div className="form-group form-width">
                <h5 className="pt-3"> User Name </h5>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  disabled={this.state.disabled}
                />
              </div>

              <div className="form-group form-width">
                <h5 className="pt-3"> Email </h5>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  disabled
                />
              </div>

              <div className="form-group form-width">
                <h5 className="pt-3"> Joined </h5>
                <input
                  type="text"
                  className="form-control"
                  name="joined"
                  value={this.state.joined}
                  onChange={this.onChange}
                  disabled
                />

                <div className="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.onEdit}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={this.state.disabled}
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                  {/* <button type="button" className="btn btn-secondary">Right</button> */}
                </div>
              </div>
            </form>

          </div>

        </div>
      </div >
    );
  }
}

Profile.propTypes = {
  userProfile: PropTypes.func.isRequired,
  getUserDetails: PropTypes.objectOf.isRequired,
  authenticated: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  authenticated: state.auth.isAuthenticated,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserProfile()),
  updateProfile: userDetails => dispatch(editProfile(userDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
