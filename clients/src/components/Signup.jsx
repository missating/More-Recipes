import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../css/style.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        fullname: { value: '', message: ''},
        username: { value: '', message: ''},
        email: { value: '',  message: ''},
        password: { value: '',  message: ''},
        confirmPassword: { value: '', message: ''}
      },
      redirect: {
        isactive: false,
        path: '/profile'
      }
    };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    var state = Object.assign({}, this.state)
    state.auth[event.target.name].value = event.target.value
		this.setState(state)
  }
  

  onSubmit(event) {
    event.preventDefault();

      const fullname = this.state.auth.fullname.value;
      const username = this.state.auth.username.value;
      const email= this.state.auth.email.value;
      const password = this.state.auth.password.value;
      const confirmPassword = this.state.auth.confirmPassword.value;
      let pmessage = this.state.auth.password.message;
     

      // console.log('this.state.auth', this.state);
          axios.post('http://localhost:3000/api/v1/users/signup', {fullname, username, email, password, confirmPassword})
          .then((response) => {
            var { token } = response.data;
            localStorage.setItem('token', token);
            var state = Object.assign({}, this.state)
            state.redirect.isactive = true
            this.setState(state);
          })
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                pmessage = error.response.data;
                console.log(pmessage);
                //console.log(error.response.status);
                //console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                //console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                //console.log('Error', error.message);
              }
              //console.log(error.config);
            });
          
    
  }

	
  render() {

    const {fullname, username, email, password, confirmPassword} = this.state.auth;

    if(this.state.redirect.isactive) {
      return (
        <Redirect to={this.state.redirect.path} />
      )
    }
    
    return (
      <div> 
        <div id="myModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                  <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
                          <form className="form-horizontal" onSubmit={this.onSubmit}>
                            
                          <div className='form-group'>
                                <input type="text" name="fullname" className="form-control" placeholder='Full Name' required
                                value={fullname.value} 
                                onChange={this.onChange} />
                                <span className="help-block">{fullname.message}</span>
                          </div>
                      
                          <div className='form-group'>
                                <input type="text" name="username" className="form-control" placeholder='User Name' required
                                value={username.value} 
                                onChange={this.onChange}  />
                                <span className="help-block">{username.message}</span>
                          </div>
                        
                          <div className='form-group'>
                                <input type="email" name="email" className="form-control" placeholder='Email Address' required
                               value={email.valuel} 
                               onChange={this.onChange} />
                               <span className="help-block">{email.message}</span>
                          </div>
                       
                          <div className='form-group'>
                                <input type="password" name="password" className="form-control" minLength="6" placeholder='Password' required
                                value={password.value} 
                                onChange={this.onChange} />
                                <span className="help-block">{password.message}</span>
                          </div>
                        
        
                          <div className='form-group'>
                                <input type="password" name="confirmPassword" className="form-control" minLength="6"  placeholder='Confirm Password' required 
                                value={confirmPassword.value} 
                                onChange={this.onChange} />
                                <span className="help-block">{confirmPassword.message}</span>
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
                              <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal">close</button>
                          </div>
                      </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Signup;
