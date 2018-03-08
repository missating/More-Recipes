import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// validations
import signinValidator from '../../validation/signinValidator';

// actions
import fetchUserSignin from '../../actions/userSignIn';


/**
 * @description Creates Signin component
 *
 * @class Signin
 *
 * @extends {React.Component}
 */
export class Signin extends React.Component {
  /**
   * @description Creates an instance of Signin.
   *
   * @constructor
   *
   * @param {any} props
   *
   * @memberof Signin
   *
   * @returns {void}
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
   * @description set state
   *
   * @param {any} nextProps
   *
   * @memberof Signin
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated &&
      nextProps.auth.errorMessage.length === 0) {
      $('#signin-modal').modal('hide');
      this.setState({
        email: '',
        password: '',
      });
    }
  }


  /**
   * @description Bind the value of the inputs to state
   *
   * @method onChange
   *
   * @param {any} event
   *
   * @memberof Signin
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
   * @memberof Signin
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (isValid) {
      this.props.signinUser(this.state);
    }
  }

  /**
    * @description Validates user's data before making post request
    *
    * @method isValid
    *
    * @memberof Signin
    *
    * @returns {boolean} true or false
    */
  isValid() {
    const { isValid, errors } = signinValidator(this.state);
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
   * @memberof Signin
   *
   * @returns {void}
   *
   */
  render() {
    const { errors } = this.state;

    let signinError;
    if (this.props.auth.errorMessage) {
      signinError = (
        <span className="help-block text-danger">
          {this.props.auth.errorMessage}
        </span>
      );
    }
    return (
      <div>
        <div
          id="signin-modal"
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

                {signinError}

                <div className="row">
                  <div className="col-sm-12">
                    <form onSubmit={this.onSubmit}>

                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="Email"
                          id="signinEmail"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          className="form-control signin-input"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="Password"
                          id="signinPassword"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          className="form-control signin-input"
                        />
                      </div>
                      {
                        errors.email &&
                        <span className="help-block text-danger">
                          {errors.email}
                        </span>
                      }
                      <br />
                      {
                        errors.password &&
                        <span
                          className="help-block text-danger"
                          id="passwordError"
                        >
                          {errors.password}
                        </span>
                      }
                      <div />

                      <button
                        className="btn btn-secondary"
                        type="submit"
                        id="loginButton"
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

Signin.propTypes = {
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

const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(Signin);
export { ConnectedComponent as ConnectedSignin };
