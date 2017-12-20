import React from 'react';
import { connect } from 'react-redux';

// actions
import userSigninRequest from '../actions/userSignIn';

// validations
import signinValidator from '../validation/signinValidator';

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
      email: 'nessa@test.com',
      password: 'passosklfkfmf',
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
 *
 *
 * @param {any} event
 * @returns {dispatch} react-redux dispatch
 * @memberof Signin
 */
  onSubmit(event) {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    this.props.dispatch(userSigninRequest(this.state));
  }

  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof Signin
   */
  render() {
    const { errors } = this.state;
    let serverErrorBag;
    if (this.props.auth.errorMessageSignin) {
      serverErrorBag = (
        <span className="help-block">{this.props.auth.errorMessageSignin}</span>
      );
    }
    return (
      <div>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
          {serverErrorBag}
          <div className="form-group">
            <input type="email" placeholder="Email" name="email"
              value={this.state.email}
              onChange={this.onChange}
              className="form-control"/>
            {errors.email && <span className="help-block">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input type="password" placeholder="Password" name="password"
              value={this.state.password}
              onChange={this.onChange}
              className="form-control"/>
            {errors.password && <span className="help-block">{errors.password}</span>}
          </div>

          <button
            className="btn btn-primary my-2 my-sm-0" type="submit">Sign In
          </button>

        </form>
      </div>
    );
  }
}


export default connect(null)(Signin);
