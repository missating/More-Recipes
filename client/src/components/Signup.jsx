import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// validations
import signupValidator from '../validation/signupValidator';

// actions
import fetchUserSignup from '../actions/signup';


/**
 *
 *
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  /**
   * Creates an instance of Signup.
   * @param {any} props
   * @memberof Signup
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
 *
 * @returns {json} with nextProps details
 * @param {any} nextProps
 * @memberof Signup
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated &&
      nextProps.auth.errorMessage.length === 0) {
      $('#signup-modal').modal('hide');
    }
  }

  /**
* @description handles form change events
* @returns {null} null
* @param {any} event
* @memberof Signup
*/
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 *
 *
 * @param {any} event
 * @returns {dispatch} react-redux dispatch
 * @memberof Signup
 */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (isValid) {
      this.props.signupUser(this.state);
    }
  }

  /**
 *
 *
 * @returns {boolean} boolean
 * @memberof Signup
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
   * @description react render method
   *
   * @returns {component} react component
   * @memberof Signup
   */
  render() {
    const { errors } = this.state;

    let signupError;
    if (this.props.auth.errorMessage) {
      signupError = (
        <span className="help-block text-danger">{this.props.auth.errorMessage}</span>
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
const authProps = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.string,
  token: PropTypes.string,
  errorMessage: PropTypes.string
};

Signup.propTypes = {
  auth: PropTypes.shape(authProps).isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  signupUser: (userDetails) => {
    dispatch(fetchUserSignup(userDetails));
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
