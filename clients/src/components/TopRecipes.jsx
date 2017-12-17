import React from 'react';
import { connect } from 'react-redux';
import receiveTopRecipeRequest from '../actions/topRecipe';
import RecipeCard from './RecipeCard';



class TopRecipes extends React.Component {

    componentWillMount () {
        this.props.recieveTopRecipes();
        console.log('props are from top recipe', this.props);
    }

    render() {
        console.log('The top recipes -- ', this.props.recipes);
        
        const topRecipe = (this.props.recipes) ? this.props.recipes : [];

        const topRecipeList = topRecipe.map((recipe, i) => {
            return (
                <div className="col-md-4" key={'topRecipe' + (i + 1)}>
                    <RecipeCard 
                     name={recipe.name}
                     ingredients={recipe.ingredients}
                     descriptions={recipe.description}
                     upvote={recipe.upvote}
                     downvote={recipe.downvote}
                     id={recipe.id}
                     userId={recipe.userId}
                     />
                
                </div>
            );
        })
        return (
            <div>
                <section className="container" style={{ marginTop: '56px' }}>
                    <h2 className="text-center"> Featured Recipes </h2>
                    <hr/>
                        <div className="row">
                        {topRecipeList}
                        </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipes: state.topRecipe.recipes
})

const mapDispatchToProps = dispatch => ({
    recieveTopRecipes: () => dispatch(receiveTopRecipeRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopRecipes);