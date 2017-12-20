import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import Profile from './Profile';
import AddRecipe from './AddRecipe';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/SingleRecipe/:id" component={SingleRecipe} />
    <Route path="/profile" component={Profile} />
    <Route path="/AddRecipe" component={AddRecipe} />
  </Switch>
);

export default Main;
