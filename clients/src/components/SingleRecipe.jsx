import React from 'react';
import { Link } from 'react-router-dom'
import eleven from '../assets/eleven.jpg'
import '../css/style.css';

class SingleRecipe extends React.Component {
    // in component did mount
    // make request to get single recipe details
    // 
    render() {
        return (
            <div>
            
                    <section className="container text-center" id="oneRecipe">
                    <h3 className="styles">Recipe Name</h3>
                    <div className="row">
                        <div className="col-md-12">
            
                            <img src={eleven} alt="Recipe Image" className="img-thumbnail" />
            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4> Ingredients </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                            <h4>Directions for cooking </h4>
                            <p>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
                            
                            <button className="btn btn-danger"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>
            
                            <button className="btn btn-success"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>
            
                            <button className="btn btn-danger"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
            
            
                        </div>
            
                    </div>
                    <div className="container top">
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="text-center"> Reviews </h4>
                                <p>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum<small><strong><i> - By User lorem</i></strong></small></p>
            
                                <p>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                    <small><strong><i> - By User lorem</i></strong></small></p>
            
                                <p>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum <small><strong><i> - By User lorem</i></strong></small></p>
                                <p> To add review, You must <Link to='/Home'>Sign In</Link></p>
                            </div>
            
            
                        </div>
            
                    </div>
            
                </section>
            
                </div>
        )
    }
}

export default SingleRecipe;