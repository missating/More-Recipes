import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import TopRecipes from '../recipe/TopRecipes';

const Home = props => (
  <div>
    <div>
      <div className="bg flex">
        <div className="home-content center">
          <h1> More Recipes </h1>
          <p>A platform for you to share your awesome recipes </p>
          <div className="btn-group">
            {!props.authenticated && (
              <div>
                <a
                  href="#signup-modal"
                  data-toggle="modal"
                  data-target="#signup-modal"
                >
                  <button
                    type="button"
                    className="btn signup-button"
                  >
                    SIGN UP
                  </button>
                </a>
              </div>
            )}
            <Signup />

            {!props.authenticated && (
              <div>
                <a
                  href="#signin-modal"
                  data-toggle="modal"
                  data-target="#signin-modal"
                >
                  <button
                    type="button"
                    className="btn signin-button"
                  >
                    SIGN IN
                  </button>
                </a>
              </div>
            )}
            <Signin />
          </div>
        </div>
      </div>
      <div className="scroll-holder">
        <a
          href="#featured"
        >
          <i
            className="fas fa-angle-double-down fa-3x scroll-down"
          />
        </a>
      </div>
    </div>
    <TopRecipes />
  </div>
);

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
