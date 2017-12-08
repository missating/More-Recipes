import React from 'react';
import RecipeCard from './RecipeCard';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import  userSignupRequest  from '../actions/signupActions'
import Signup from './Signup';
import banner1 from '../assets/banner1.jpg';
import eight from '../assets/eight.jpg';
import seventen from '../assets/seventen.jpg';

import '../css/style.css';

class Home extends React.Component {
    render() {
        const { userSignupRequest } = this.props;
        return (
    <div>
            <section className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-md-8">
                        <img src={banner1} alt="..." className="img-thumbnail size" id="mainImage"/>
                    </div>
                    <div className="col-md-4" id="media">
                        <p>More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.</p>
                        <p>Suppose a user comes up with a recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.</p>
                        <p><strong>Don't have an account ? </strong><a href="#myModal" data-toggle="modal" data-target="#myModal"><button type="button" className="btn btn-dark btn-sm fa fa-sign-in"> Sign Up</button></a></p>
                        <Signup userSignupRequest={userSignupRequest} {...this.props}/>
                    </div>
                </div>
            </section>
        
        <section className="container" style={{ marginTop: '56px' }}>
          <h2 className="text-center"> Featured Recipes </h2>
          <hr/>
          <div className="row">
              <div className="col-md-4">
              <RecipeCard />
              </div>
              <div className="col-md-4">
              <RecipeCard />
              </div>
              <div className="col-md-4">
              <RecipeCard />
              </div>
            </div>
        
            <div className="row">
            <div className="col-md-4">
              <RecipeCard />
              </div>
              <div className="col-md-4">
              <RecipeCard />
              </div>
              <div className="col-md-4">
              <RecipeCard />
              </div> 
            </div>
            </section>
    </div>
        )
    }
}

Home.propTypes = {
	userSignupRequest: propTypes.func.isRequired
}

export default connect((state) => { return {} }, { userSignupRequest })(Home);
