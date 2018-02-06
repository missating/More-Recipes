import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Recipes from './Recipes';
import EditRecipe from './EditRecipe';
import SingleRecipe from './SingleRecipe';
import Profile from './Profile';
import AddRecipe from './AddRecipe';
import UserRecipes from './UserRecipes';
import UserFavourites from './UserFavourites';
import NotFound from './NotFound'


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes" exact component={Recipes} />
    <Route path="/recipes/view/:id" exact component={SingleRecipe} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/recipe/add" exact component={AddRecipe} />
    <Route path="/users/recipes" exact component={UserRecipes} />
    <Route path="/recipe/edit/:id" exact component={EditRecipe} />
    <Route path="/users/favourites" exact component={UserFavourites} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
