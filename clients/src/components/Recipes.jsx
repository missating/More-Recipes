import React from 'react';
import { connect } from 'react-redux';
import '../css/style.css';
import RecipeGallery from './RecipeGallery';
import receiveRecipeRequest from '../actions/recipes';


class Recipes extends React.Component {
    
    componentWillMount () {
        this.props.receiveRecipe();
        console.log('props are----', this.props);
    }
    render() {
        console.log('The recipes -- ', this.props.allRecipes);
        const recipe = (this.props.allRecipes) ? this.props.allRecipes : [];  

                const recipeList = recipe.map((recipe, i) => {
                    return (
                        <div className="col-md-4" key={'recipe' + (i + 1)}>
                            <RecipeGallery 
                                name={recipe.name}
                                ingredients={recipe.ingredients}
                                descriptions={recipe.descriptions}
                                upvote={recipe.upvote}
                                downvote={recipe.downvote}
                                id={recipe.id}
                                userId={recipe.userId}
                            />
                        </div>
                    );
                })

        return (
            <div className="container">
                <div className="row">
                    {recipeList}
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    allRecipes: state.receiveRecipe.allRecipes
})
const mapDispatchToProps = dispatch => ({
    receiveRecipe: () => dispatch(receiveRecipeRequest())
})
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);