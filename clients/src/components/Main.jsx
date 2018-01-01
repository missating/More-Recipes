import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import Profile from './Profile';
import AddRecipe from './AddRecipe';
import UserRecipes from './UserRecipes';
import EditRecipe from './EditRecipe';
import UserFavourites from './UserFavourites';


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/SingleRecipe/:id" component={SingleRecipe} />
    <Route path="/profile" component={Profile} />
    <Route path="/recipe/add" component={AddRecipe} />
    <Route path="/user/recipes" component={UserRecipes} />
    <Route path="/recipe/edit/:id" component={EditRecipe} />
    <Route path="/user/favourites" component={UserFavourites} />
  </Switch>
);

export default Main;
