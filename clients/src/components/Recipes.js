import React from 'react';
import '../css/style.css';
import ten from '../assets/ten.jpg';
import thirteen from '../assets/thirteen.jpg';
import eleven from '../assets/eleven.jpg';

const Recipes = () => (
  <div>
    <section className="container" style={{ marginTop: '80px' }}>
        <div className="row">
            <div className="col-md-6">
                <h2> Popular Recipes </h2>
            </div>
            <div className="col-md-6">
                <form className="ml-auto" action="#" method="post">
                    <input type="text" placeholder="search..." id="right"/>
                    <input type="submit" className="btn btn-primary btn-sm" id="bottom" value="Search" />
                </form>
            </div>
        </div>
        <hr/>
        
        <div className="row">
            <div className="col-md-4">
                <div className="zoom-container">
                  <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 1</span>
                    </span>
                    <img src={ten} />
                </a>
                </div>

                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

            <div className="col-md-4">
                <div className="zoom-container">
                  <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 2</span>
                    </span>
                    <img src={ten} />
                </a>
                </div>


                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

            <div className="col-md-4">
                <div className="zoom-container">
              <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 3</span>
                    </span>
                    <img src={ten} />
                </a>
                </div>

                <div className="mainBtn" style={ {marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

        </div>


        <div className="row">
            <div className="col-md-4">
                <div className="zoom-container">
                  <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 4</span>
                    </span>
                    <img src={eleven} />
                </a>
                </div>

                <div className="mainBtn" style={ {marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

            <div className="col-md-4">
                <div className="zoom-container">
                  <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 5</span>
                    </span>
                    <img src={eleven} />
                </a>
                </div>

                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

            <div className="col-md-4">
                <div className="zoom-container">
                  <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 6</span>
                    </span>
                    <img src={eleven} />
                </a>
                </div>

                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

        </div>


        <div className="row">
            <div className="col-md-4">
                <div className="zoom-container">
                   <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 8</span>
                    </span>
                    <img src={thirteen} />
                </a>
                </div>

                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

            <div className="col-md-4">
                <div className="zoom-container">
                    <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 9</span>
                    </span>
                    <img src={thirteen} />
                </a>
                </div>

                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

            <div className="col-md-4">
                <div className="zoom-container">
                    <a href="">
                    <span className="zoom-caption">
                        <span>Recipe 10</span>
                    </span>
                    <img src={thirteen} />
                </a>
                </div>

                <div className="mainBtn" style={{ marginLeft: '95px' }}>
                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-thumbs-down" aria-hidden="true"></i></span> 2</button>

                    <button className="btn btn-success btn-sm"><span><i className="fa fa-thumbs-up" aria-hidden="true"></i></span> 6</button>

                    <button className="btn btn-danger btn-sm"><span><i className="fa fa-heart" aria-hidden="true"></i></span> 10</button>
                </div>

            </div>

        </div>
    </section>

     
    <div className="center" style={{ marginTop: '30px' }}>
            <div className="pagination">
                <a href="#">&laquo;</a>
                <a href="#">1</a>
                <a href="#" className="active">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">&raquo;</a>
            </div>
        </div>
    
  </div>
)

export default Recipes