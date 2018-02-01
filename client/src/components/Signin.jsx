import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// validations
import signinValidator from '../validation/signinValidator';

// actions
import fetchUserSignin from '../actions/userSignIn';


/**
 *
 *
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends React.Component {
  /**
   * Creates an instance of Signin.
   * @param {any} props
   * @memberof Signin
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 * @description handles form change events
 * @returns {null} null
 * @param {any} event
 * @memberof Signin
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 *
 *
 * @param {any} event
 * @returns {dispatch} react-redux dispatch
 * @memberof Signin
 */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (isValid) {
      this.props.signinUser(this.state);
    }
  }

  /**
*
*
* @returns {boolean} boolean
* @memberof Signin
*/
  isValid() {
    const { isValid, errors } = signinValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof Signin
   */
  render() {
    const { errors } = this.state;

    let signinError;
    if (this.props.auth.errorMessage) {
      signinError = (
        <span className="help-block">{this.props.auth.errorMessage}</span>
      );
    }
    return (
      <div>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>

          {signinError}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              className="form-control"
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
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              className="form-control"
            />
            {
              errors.password &&
              <span className="help-block text-danger">
                {errors.password}
              </span>
            }
          </div>

          <button
            className="btn btn-primary my-2 my-sm-0"
            type="submit"
          >Sign In
          </button>

        </form>
      </div>
    );
  }
}

Signin.propTypes = {
  auth: PropTypes.objectOf.isRequired,
  signinUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  signinUser: (userDetails) => {
    dispatch(fetchUserSignin(userDetails));
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
