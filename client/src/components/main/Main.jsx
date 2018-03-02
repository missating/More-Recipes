import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Recipes from '../recipe/Recipes';
import EditRecipe from '../recipe/EditRecipe';
import SingleRecipe from '../recipe/SingleRecipe';
import Profile from '../user/Profile';
import AddRecipe from '../recipe/AddRecipe';
import UserRecipes from '../user/UserRecipes';
import UserFavourites from '../user/UserFavourites';
import NotFound from '../common/NotFound';


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
