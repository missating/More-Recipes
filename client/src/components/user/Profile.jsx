import React from 'react';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


// actions
import getUserProfile from '../../actions/userProfile';
import editProfile from '../../actions/editUserProfile';


/**
 * @description Creates Profile component
 *
 * @class Profile
 *
 * @extends {React.Component}
 */
export class Profile extends React.Component {
  /**
   * @description Creates an instance of Profile.
   *
   * @constructor
   *
   * @param {object} props
   *
   * @memberof Profile
   *
   * @returns {void}
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
    this.cancelEdit = this.cancelEdit.bind(this);
  }


  /**
  * @description Gets user details
  *
  * @method
  *
  * @memberof Profile
  *
  * @returns {void}
  */
  componentDidMount() {
    this.props.getUserDetails();
  }


  /**
   * @description Set state
   *
   * @param {object} nextProps
   *
   * @memberof Profile
   *
   * @returns {void}
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
   * @description Bind the value of the inputs to state
   *
   * @method onChange
   *
   * @param {object} event
   *
   * @memberof Profile
   *
   * @returns {void}
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * @description Sets state to enable
   *
   * @memberof Profile
   *
   * @returns {void}
   */
  onEdit() {
    this.setState({ disabled: !this.state.disabled });
  }


  /**
   * @description Submit the form
   *
   * @method onSubmit
   *
   * @param {object} event
   *
   * @memberof Profile
   *
   * @returns {void}
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
   * @description Sets state to disable
   *
   * @memberof Profile
   *
   * @returns {void}
   */
  cancelEdit() {
    this.setState({
      disabled: true
    });
  }


  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof Profile
   *
   * @returns {void}
   *
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
                  id="usernameField"
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

                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                  style={{
                    marginTop: '30px',
                    maxWidth: '297px'
                  }}
                >
                  <button
                    type="button"
                    id="profileEdit"
                    className="btn btn-secondary"
                    onClick={this.onEdit}
                    disabled={!this.state.disabled}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    id="profileSubmit"
                    className="btn btn-secondary"
                    disabled={this.state.disabled}
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    id="profileCancel"
                    className="btn btn-secondary"
                    onClick={this.cancelEdit}
                    disabled={this.state.disabled}
                  >
                    Cancel
                  </button>
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
  userProfile: PropTypes.shape({}).isRequired,
  getUserDetails: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
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

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(Profile);
export { ConnectedComponent as ConnectedProfile };
