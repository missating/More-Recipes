import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// validations
import signupValidator from '../../validation/signupValidator';

// actions
import fetchUserSignup from '../../actions/signup';


/**
 * @description Creates Signup component
 *
 * @class Signup
 *
 * @extends {React.Component}
 */
export class Signup extends React.Component {
  /**
   * @description Creates an instance of Signup.
   *
   * @constructor
   *
   * @param {any} props
   *
   * @memberof Signup
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Sets state
   *
   * @param {any} nextProps
   *
   * @memberof Signup
   *
   * @returns {void}
   *
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated &&
      nextProps.auth.errorMessage.length === 0) {
      $('#signup-modal').modal('hide');
      this.setState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }

  /**
   * @description Bind the value of the inputs to state
   *
   * @method onChange
   *
   * @memberof Signup
   *
   * @param {any} event
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description Submit the form
   *
   * @method onSubmit
   *
   * @param {object} event
   *
   * @memberof Signup
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (isValid) {
      this.props.signupUser(this.state);
    }
  }

  /**
   * @description Validates user's data before making post request
   *
   * @method isValid
   *
   * @memberof Signup
   *
   * @returns {boolean} true or false
   */
  isValid() {
    const { isValid, errors } = signupValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    } else {
      this.setState({ errors: {} });
      return isValid;
    }
  }

  /**
   * @description Renders react component
   *
   * @method render
   *
   * @memberof Signup
   *
   * @returns {void}
   *
   */
  render() {
    const { errors } = this.state;

    let signupError;
    if (this.props.auth.errorMessage) {
      signupError = (
        <span className="help-block text-danger">
          {this.props.auth.errorMessage}
        </span>
      );
    }
    return (
      <div>
        <div
          id="signup-modal"
          className="modal fade"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  style={{
                    float: 'right',
                    cursor: 'pointer'
                  }}
                >
                  &times;
                </span>
              </button>
              <div className="modal-body">

                {signupError}

                <div className="row">
                  <div className="col-sm-12">
                    <form onSubmit={this.onSubmit}>

                      <div className="form-group">
                        <input
                          type="text"
                          name="fullname"
                          className="form-control"
                          placeholder="Full Name"
                          value={this.state.fullname}
                          onChange={this.onChange}
                        />
                        {
                          errors.fullname &&
                          <span className="help-block text-danger">
                            {errors.fullname}
                          </span>
                        }
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder="User Name"
                          value={this.state.username}
                          onChange={this.onChange}
                        />
                        {
                          errors.username &&
                          <span className="help-block text-danger">
                            {errors.username}
                          </span>
                        }
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email Address"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        {
                          errors.email &&
                          <span className="help-block text-danger">
                            {errors.email}
                          </span>
                        }
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        {
                          errors.password &&
                          <span className="help-block text-danger">
                            {errors.password}
                          </span>
                        }
                      </div>


                      <div className="form-group">
                        <input
                          type="password"
                          id="signupPassword"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={this.state.confirmPassword}
                          onChange={this.onChange}
                        />
                        {
                          errors.confirmPassword &&
                          <span className="help-block text-danger">
                            {errors.confirmPassword}
                          </span>
                        }
                      </div>
                      <button
                        className="btn btn-secondary"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      fullname: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.number
    }),
    errorMessage: PropTypes.string
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  signupUser: (userDetails) => {
    dispatch(fetchUserSignup(userDetails));
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(Signup);
export { ConnectedComponent as ConnectedSignup };
