[![Build Status](https://travis-ci.org/missating/More-Recipes.svg?branch=develop)](https://travis-ci.org/missating/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/missating/More-Recipes/badge.svg?branch=coveralls)](https://coveralls.io/github/missating/More-Recipes?branch=coveralls)


## More-Recipes

More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.
Suppose a user comes up with a recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

 ## Features
<ul>
<li>A User can sign up and sign in to use app</li>
    
<li>A recipe listing page that allows viewers to search for recipes. It also shows popular recipes.</li>

<li>A User can view details of a particular recipe, upvote/downvote recipes, add recipe as favourite and see any reviews. Only Authenticated users can post reviews</li>

<li>A page, where authenticated users can view a list of their favourite recipes</li>

<li>A user's profile page</li>

<li>A page where an authenticated user can do the following:</li>
        <ol>
        <li> Add recipe</li>
        <li> View or Modify the recipe he/she added</li>
        <li> Delete the recipe he/she added </li>
        <li> View favourite recipes </li>
        <li> View all recipes he/she has added </li>
        </ol>

</ul>

## To Run:

* clone this repo by typing this in the command line

```
git clone https://github.com/missating/More-Recipes.git
```

* then cd into the new directry and run

```
npm install && npm run start:dev
```

* Navigate to your browser and go to the following URL

* GET http://localhost:3000/api/v1/recipes - to view all recipes

* PUT http://localhost:3000/api/v1/recipes/1 - to update a recipes with ID of 1

* DELETE http://localhost:3000/api/v1/recipes/1 - to delete a recipe with ID of 1

* POST http://localhost:3000/api/v1/recipes - to add a recipe

* POST http://localhost:3000/api/v1/recipes/1/review - to add a review for recipe with ID of 1
