[![Build Status](https://travis-ci.org/missating/More-Recipes.svg?branch=develop)](https://travis-ci.org/missating/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/missating/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/missating/More-Recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e34429abd769ade0fa9/maintainability)](https://codeclimate.com/github/missating/More-Recipes/maintainability)
[![codecov](https://codecov.io/gh/missating/More-Recipes/branch/develop/graph/badge.svg)](https://codecov.io/gh/missating/More-Recipes)


# More-Recipes
More-Recipes is a full stack web application that provides a platform for users to share their awesome and exciting recipe ideas they have invented or learnt.

 ### Technologies
 ----

 1. [Nodejs](https://nodejs.org/en/)
 1. [Postgresql](https://www.postgresql.org/)
 1. [Express](https://expressjs.com/)
 1. [Sequelize](http://docs.sequelizejs.com/)
 1. [React](https://reactjs.org/)
 1. [Redux](https://redux.js.org/)

## API Documentation
----
The full documentation for all API end point can be found [here](https://nkoyo-more-recipes.herokuapp.com/api/docs/)

## Functionalities 
----
Users are grouped into 2 categories: 

### Non Registered Users: 
* Create an account (Sign up)
* View Featured Recipes 
* View all Recipes 
* View a single Recipe 
* Search for a Recipe

### Registered Users: 
* Sign in as a user 
* Create Recipe 
* Update created Recipes
* Delete Created Recipes 
* Upvote a Recipe
* Downvote a Recipe 
* Add a recipe as Favourite
* View all created Recipe
* View all favourited Recipe
* Remove upvote on a Recipe
* Remove downvote on a Recipe
* Remove Recipe from favourite
* Add Review for a Recipe 
* View Profile
* Update Profile
* View Featured Recipes 
* View all Recipes 
* View a single Recipe 
* Search for a Recipe

## Limitations 
----
This project has some Limitations. The most notable ones are:

1. Users cannot view other user's profile
2. Users cannot view other user's favourited recipes or created recipes
3. Users cannot change their password or reset password if forgotten
4. Users cannot deactivate their account

## How to Install
____

1. Clone the repository and `change directory` into the folder 

`git clone https://github.com/missating/More-Recipes.git && cd more-recipes`

2. Install project dependencies 

`npm install`

3. Create a `.env` file and copy comtent of `.env.sample` to it and provide the appropraite values

4. Look at this file [config.json](https://github.com/missating/More-Recipes/blob/develop/server/config/config.js) and read [this](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb) to setup postgres/sequelize to create a Database then run migration

`npm run migration`

5. Then start the server 

`npm run start:dev`

6. Navigate to your browser to view the app on `http://localhost:3000`

## Demo
____

View the application [here](https://nkoyo-more-recipes.herokuapp.com/)

## Test
____

The application uses the following for Testing:

* Backend Test 
`npm run test` 

## FAQ 
____

* What language was used to develop this application ?

`This is a fullstack Javascript application with client side in React/Redux`

* Who can contribute ?

`Anyone`

## Author 
____

Nkoyo Ating [miss__ating](https://missating.github.io/)

## License 
____

This is licensed for your use, modification and distribution under the [MIT LICENSE](https://github.com/missating/More-Recipes/blob/develop/LICENSE)