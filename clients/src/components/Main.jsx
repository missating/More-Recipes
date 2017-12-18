import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Recipes from './Recipes'
import SingleRecipe from './SingleRecipe'
import Profile from './Profile'



class Main extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/recipes' component={Recipes} />
        <Route path="/SingleRecipe/:id" component={SingleRecipe} />
        <Route path="/profile" component={Profile} /> 
      </Switch>
    )
  }
}

export default Main;