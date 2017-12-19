import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Signin from './Signin';
/**
 *
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   *
   *
   * @returns {component} react component
   * @memberof Header
   */
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">More Recipes</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                <span className="sr-only">(current)</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes">Recipes</Link>
              </li>

              {
                this.props.auth.isAuthenticated &&
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
              }
            </ul>

            {
              !this.props.auth.isAuthenticated &&
                    <Signin {...this.props} />
            }
          </div>
        </nav>
      </header>
    );
  }
}


const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(Header);

