import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/style.css';

// The Header creates links that can be used to navigate
// between routes.

class Header extends React.Component {
  render() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">More Recipes</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to='/'>Home</Link> 
                      <span className="sr-only">(current)</span>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to='/recipes'>Recipes</Link>
                    </li>
                  </ul>
                  {
                    !this.props.auth.isAuthenticated &&
                    <form className="form-inline my-2 my-lg-0">
                      <input className="form-control mr-sm-2" type="email" placeholder="Email" aria-label="Email" />
                      <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
                      <button className="btn btn-primary my-2 my-sm-0" type="submit">Sign In</button>
                    </form>
                  }

                  {
                    this.props.auth.isAuthenticated &&
                    <p> profile </p>
                  }
                </div>
          </nav>
      </header>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
}


export default connect(mapStateToProps)(Header);

