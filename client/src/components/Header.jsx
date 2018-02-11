import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import signUserOut from '../actions/signout';

const Header = props => (
  <header>
    <nav
      className="navbar navbar-expand-md navbar-dark fixed-top bg-dark bg-black"
    >
      <a
        className="navbar-brand"
        href="/"
      >
        More Recipes
      </a>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <span className="sr-only">(current)</span>
          <li className="nav-item">
            <Link className="nav-link" to="/recipes">Recipes</Link>
          </li>

          {
            props.authenticated &&
            <Link className="nav-link" to="/recipe/add">Create Recipe</Link>
          }

          {
            props.authenticated &&
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dashboard
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link
                  className="nav-link"
                  to="/profile"
                >
                  My Profile
                </Link>
                <Link
                  className="nav-link"
                  to="/users/recipes"
                >
                  My Recipes
                </Link>
                <Link
                  className="nav-link"
                  to="/users/favourites"
                >
                  My Favourites
                </Link>
              </div>
            </li>
          }

          {
            props.authenticated &&
            <li className="nav-item">
              <button
                className="btn-secondary"
                style={{ width: '100px' }}
                onClick={() => { props.signUserOut(); }}
              >
                SIGN OUT
              </button>
            </li>
          }

        </ul>
      </div>
    </nav>

  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signUserOut: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signUserOut: () => {
    dispatch(signUserOut());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

