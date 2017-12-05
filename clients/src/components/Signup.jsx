import React from 'react';
import PropTypes from 'prop-types';
import signupValidator from '../validation/signupValidator';
import { browserHistory } from 'react-router';
import '../css/style.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
        isLoading: false
    }
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  isValid() {
		const { isValid , errors } = signupValidator(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
  

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest(this.state).then(
        () => {
          
        },
        ({ err }) => this.setState({ errors: err.response.data, isLoading: false })
      );
		}
  }

	
  render() {
    const { errors } = this.state;
    return (
      <div> 
        <div id="myModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                  <div className="modal-body">

                      <div className="row">
                          <div className="col-sm-12">
                          <form className="form-horizontal" onSubmit={this.onSubmit}>
                            
                          <div className="form-group">
                                <input type="text" name="fullname" className="form-control" placeholder='Full Name'
                                value={this.state.fullname} 
                                onChange={this.onChange} />
                                 {errors.fullname && <span className="help-block">{errors.fullname}</span>}
                          </div>
                      
                          <div className="form-group">
                                <input type="text" name="username" className="form-control" placeholder='User Name'
                                value={this.state.username} 
                                onChange={this.onChange}  />
                                {errors.username && <span className="help-block">{errors.username}</span>}
                          </div>
                        
                          <div className="form-group">
                                <input type="email" name="email" className="form-control" placeholder='Email Address'
                               value={this.state.email} 
                               onChange={this.onChange} />  
                             {errors.email && <span className="help-block">{errors.email}</span>}
                          </div>
                       
                          <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder='Password'
                                value={this.state.password} 
                                onChange={this.onChange} /> 
                                 {errors.password && <span className="help-block">{errors.password}</span>}
                          </div>
                        
        
                          <div className="form-group">
                                <input type="password" name="confirmPassword" className="form-control" placeholder='Confirm Password' 
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
                              <button disabled={this.state.isLoading} className="btn btn-danger btn-sm" data-dismiss="modal">close</button>
                          </div>
                      </div>
                        </div>
                    </div>
                </div>
        )
    }
}

Signup.PropTypes = {
	userSignupRequest: PropTypes.func.i
}

export default Signup;
