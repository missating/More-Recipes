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
  *
  * @returns {json} with nextProps details
  * @param {any} nextProps
  * @memberof Signin
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated &&
      nextProps.auth.errorMessage.length === 0) {
      $('#signin-modal').modal('hide');
    }
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
        <span className="help-block text-danger">{this.props.auth.errorMessage}</span>
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
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          className="form-control signin-input"
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
                          className="form-control signin-input"
                        />
                        {
                          errors.password &&
                          <span className="help-block text-danger">
                            {errors.password}
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
  user: PropTypes.object,
  token: PropTypes.string,
  errorMessage: PropTypes.string
};

Signin.propTypes = {
  auth: PropTypes.shape(authProps).isRequired,
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
