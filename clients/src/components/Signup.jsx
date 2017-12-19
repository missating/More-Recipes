import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

// validations
import signupValidator from '../validation/signupValidator';

// actions
import userSignupRequest from '../actions/signupActions';


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
      fullname: 'jjajaja  ',
      username: 'sjsjjss',
      email: 'jjsjs@ssks.com',
      password: '123456',
      confirmPassword: '123456',
      errors: {}
    };
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
 * @returns {boolean} boolean
 * @memberof Signup
 */
  isValid() {
    const { isValid, errors } = signupValidator(this.state);
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
 * @memberof Signup
 */
  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid();
    if (!isValid) {
      return;
    }
    this.props.userSignupRequest(this.state)
      .then(() => {
        $("#myModal").modal('hide');
      }).catch(() => {});
  }

  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof Signup
   */
  render() {
    const { errors } = this.state;
    let serverErrorBag;
    if (this.props.auth.errorMessage) {
      serverErrorBag = (
        <span className="help-block">{this.props.auth.errorMessage}</span>
      );
    }
    return (
      <div>
        <div id="myModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">

                {serverErrorBag}

                <div className="row">
                  <div className="col-sm-12">
                    <form className="form-horizontal" onSubmit={this.onSubmit}>

                      <div className="form-group">
                        <input type="text" name="fullname" className="form-control" placeholder="Full Name"
                          value={this.state.fullname}
                          onChange={this.onChange} />
                        {errors.fullname && <span className="help-block">{errors.fullname}</span>}
                      </div>

                      <div className="form-group">
                        <input type="text" name="username" className="form-control" placeholder="User Name"
                          value={this.state.username}
                          onChange={this.onChange} />
                        {errors.username && <span className="help-block">{errors.username}</span>}
                      </div>

                      <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="Email Address"
                          value={this.state.email}
                          onChange={this.onChange} />
                        {errors.email && <span className="help-block">{errors.email}</span>}
                      </div>

                      <div className="form-group">
                        <input type="password" name="password" className="form-control" placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChange} />
                        {errors.password && <span className="help-block">{errors.password}</span>}
                      </div>


                      <div className="form-group">
                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password"
                          value={this.state.confirmPassword}
                          onChange={this.onChange} />
                        {errors.confirmPassword && <span className="help-block">{errors.confirmPassword}</span>}
                      </div>
                      <br/>

                      <button
                        className="btn btn-primary btn-sm" type="submit"> Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger btn-sm" data-dismiss="modal">close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (userDetails) => bindActionCreators(userSignupRequest, dispatch)
});

export default connect(mapDispatchToProps)(Signup);
