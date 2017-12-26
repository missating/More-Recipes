import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import Profile from './Profile';
import AddRecipe from './AddRecipe';
import UserRecipes from './UserRecipes';
import EditRecipe from './EditRecipe';


const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/SingleRecipe/:id" component={SingleRecipe} />
    <Route path="/profile" component={Profile} />
    <Route path="/AddRecipe" component={AddRecipe} />
    <Route path="/UserRecipes" component={UserRecipes} />
    <Route path="/recipe/edit/:id" component={EditRecipe} />
  </Switch>
);

export default Main;
