import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedHome } from './Home';
import { ConnectedRecipes } from '../recipe/Recipes';
import { ConnectedEditRecipe } from '../recipe/EditRecipe';
import { ConnectedSingleRecipe } from '../recipe/SingleRecipe';
import { ConnectedProfile } from '../user/Profile';
import { ConnectedAddRecipe } from '../recipe/AddRecipe';
import { ConnectedUserRecipes } from '../user/UserRecipes';
import { ConnectedUserFavourites } from '../user/UserFavourites';
import NotFound from '../common/NotFound';


export const Main = () => (
  <div className="main-cont">
    <Switch>
      <Route exact path="/" component={ConnectedHome} />
      <Route path="/recipes" exact component={ConnectedRecipes} />
      <Route path="/recipes/view/:id" exact component={ConnectedSingleRecipe} />
      <Route path="/profile" exact component={ConnectedProfile} />
      <Route path="/recipe/add" exact component={ConnectedAddRecipe} />
      <Route path="/users/recipes" exact component={ConnectedUserRecipes} />
      <Route path="/recipe/edit/:id" exact component={ConnectedEditRecipe} />
      <Route
        path="/users/favourites"
        exact
        component={ConnectedUserFavourites}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export { Main as RouterMain };
