import React from 'react';
import { connect } from 'react-redux';
import UserRecipeCard from '../components/UserRecipeCard';
import receiveUserRecipes from '../actions/userRecipes';
/**
 *
 *
 * @className UserRecipe
 * @extends {React.Component}
 */
class UserRecipes extends React.Component {
  /**
   * Creates an instance of UserRecipes.
   * @param {any} props
   * @memberof UserRecipes
   */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
 *
 *@returns {null} null
 * @memberof UserRecipes
 */
  componentWillMount() {
    this.props.receiveUserRecipe();
  }
  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof UserRecipes
   */
  render() {
    // console.log(this.props.userRecipes);
    console.log(this.props);
    const userRecipes = (this.props.userRecipes) ? this.props.userRecipes : [];
    const userRecipesList = userRecipes.map((recipe, i) => {
      console.log('recipe number: ', i);
      return (
        <div className="col-md-4" key={`recipe${i + 1}`}>
          <UserRecipeCard
            name={recipe.name}
            description={recipe.description}
            id={recipe.id}
          />
        </div>
      );
    });
    return (
      <div>
        <section className="section" id="view">
          <div className="container">
            <h3 className="text-center bottom">My Recipes</h3>
            <div className="row">
              {userRecipesList}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userRecipes: state.userRecipes.allUserRecipes
});

const mapDispatchToProps = dispatch => ({
  receiveUserRecipe: () => dispatch(receiveUserRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
