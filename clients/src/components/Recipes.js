import React from 'react';
import '../css/style.css';
import RecipeGallery from './RecipeGallery';

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
          <RecipeGallery />
          </div>
          <div className="col-md-4">
          <RecipeGallery />
          </div>
          <div className="col-md-4">
          <RecipeGallery />
          </div>
      </div>
      
      <div className="row">
          <div className="col-md-4">
          <RecipeGallery />
          </div>
          <div className="col-md-4">
          <RecipeGallery />
          </div>
          <div className="col-md-4">
          <RecipeGallery />
          </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <RecipeGallery />
          </div>
          <div className="col-md-4">
          <RecipeGallery />
          </div>
          <div className="col-md-4">
          <RecipeGallery />
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