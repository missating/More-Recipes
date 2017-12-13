import React from 'react';
import { connect } from 'react-redux';
import '../css/style.css';
import RecipeGallery from './RecipeGallery';
import getRecipe from '../actions/getRecipesActions';


class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount () {
        this.props.getAllRecipes();
        console.log('props are----', this.props);
    }
    render() {
        console.log('The recipes -- ', this.props.allRecipes);
        const recipe = (this.props.allRecipes) ? this.props.allRecipes : []
;        const recipeList = recipe.map((recipe, i) => {
            return (<div className="col-md-4" key={'recipe' + (i + 1)}>
                <RecipeGallery 
                    name={recipe.name}
                    ingredients={recipe.ingredients}
                    descriptions={recipe.description}
                    upvote={recipe.upvote}
                    downvote={recipe.downvote}
                    id={recipe.id}
                    userId={recipe.userId}
                />
            </div>);
        })
        return (
            <div className="container">
                <div className="row">
                    {recipeList}
                {/* <section className="container" style={{ marginTop: '80px' }}>
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
                    <RecipeGallery 
                        name={this.}
                    />
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
                */}
            </div>
          </div>
        );
    }
}
const mapStateToProps = state => ({
    allRecipes: state.getRecipe.allRecipes
})
const mapDispatchToProps = dispatch => ({
    getAllRecipes: () => dispatch(getRecipe())
})
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);