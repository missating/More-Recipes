import React from 'react';
import banner1 from '../assets/banner1.jpg';
import seven from '../assets/seven.jpg';
import eight from '../assets/eight.jpg';
import seventen from '../assets/seventen.jpg';

import '../css/style.css';

const Home = () => (
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

<div id="myModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
<div className="modal-dialog modal-lg">
    <div className="modal-content">
        <div className="modal-body">
            <div className="row">
                <div className="col-sm-12">
                    <form action="authUsers/profile" method="post" className="form-horizontal" id="inform">
                        <label htmlFor="username">Full Name</label>
                        <input type="text" name="fullname" className="form-control" />

                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" className="form-control" />

                        <label htmlFor="username">Email</label>
                        <input type="text" name="email" className="form-control" />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" />

                        <label htmlFor="Cpassword">Confirm Password</label>
                        <input type="password" name="Cpassword" className="form-control" /><br/>
                        <div className="button">
                            <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
                        </div>
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
        </div>
    </section>

<section className="container" style={{ marginTop: '56px' }} id="explore">
  <h2 className="text-center"> Featured Recipes </h2>
  <hr/>
  <div className="container">
    <div className="row">
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">Recipe 1</div>
                <div className="card-main">
                <img src={seven} alt="..." className="img-thumbnail"/>
                    <div className="main-description">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>

                    <div className="mainBtn">
                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                        <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                    </div>
                    <a href="">                           
                    <button type="button" className="btn btn-outline-primary">Details</button></a>
                </div>
            </div>

        </div>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Recipe 2
                </div>
                <div className="card-main">
                <img src={eight} alt="..." className="img-thumbnail"/>
                    <div className="main-description">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                    <div className="mainBtn">
                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                        <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                    </div>

                    <a href="">                           
                    <button type="button" className="btn btn-outline-primary">Details</button></a>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Recipe 3
                </div>
                <div className="card-main">
                <img src={seventen} alt="..." className="img-thumbnail"/>
                    <div className="main-description">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                    <div className="mainBtn">
                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                        <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                    </div>

                    <a href="">
                    <button type="button" className="btn btn-outline-primary">Details</button></a>

                </div>
            </div>
        </div>
    </div>
  </div>

    </section>

    
<section className="container" style={{ marginTop: '56px' }} id="explore">
<h2 className="text-center"> Popular Recipes </h2>
<hr/>
<div className="container">
    <div className="row">
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">Recipe 1</div>
                <div className="card-main">
                <img src={seven} alt="..." className="img-thumbnail"/>
                    <div className="main-description">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>

                    <div className="mainBtn">
                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                        <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                    </div>
                    <a href="">                           
                    <button type="button" className="btn btn-outline-primary">Details</button></a>
                </div>
            </div>

        </div>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Recipe 2
                </div>
                <div className="card-main">
                <img src={eight} alt="..." className="img-thumbnail"/>
                    <div className="main-description">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                    <div className="mainBtn">
                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                        <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                    </div>

                    <a href="">                           
                    <button type="button" className="btn btn-outline-primary">Details</button></a>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Recipe 3
                </div>
                <div className="card-main">
                <img src={seventen} alt="..." className="img-thumbnail"/>
                    <div className="main-description">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                    <div className="mainBtn">
                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                        <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                        <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                    </div>

                    <a href="">
                    <button type="button" className="btn btn-outline-primary">Details</button></a>

                </div>
            </div>
        </div>
    </div>
</div>

    </section>
  </div>
)

export default Home
