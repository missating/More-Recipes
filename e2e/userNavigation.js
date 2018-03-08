const config = require('./config');
const faker = require('faker');

const randomNum = Math.ceil(Math.random(1000) * 1000);
const fullname = faker.name.findName();
const username = `test${randomNum}`;
const email = faker.internet.email();

module.exports = {
  'Registers a new user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('#sigupButton')
      .pause(1000)
      .setValue('input[name=fullname]', fullname)
      .pause(1000)
      .setValue('input[name=username]', username)
      .pause(1000)
      .setValue('input[name=email]', email)
      .pause(1000)
      .setValue('input[name=password]', '123456')
      .pause(1000)
      .setValue('input[name=confirmPassword]', '123456')
      .pause(1000)
      .click('#registerbutton')
      .pause(1000)
      .waitForElementVisible('button#signout')
      .pause(1000)
      .assert.containsText('button#signout', 'SIGN OUT')
      .pause(1000),


  'Create new Recipe 3': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#createRecipeLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .setValue('input[name=name]', faker.lorem.words(2))
      .pause(1000)
      .setValue('input[name=ingredients]', 'test, test')
      .pause(1000)
      .setValue('textarea[name=description]', faker.lorem.paragraphs())
      .pause(1000)
      .click('#recipeButton')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .click('a#viewRecipe')
      .pause(1000),

  'Favourite a single recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('button#onFavourite')
      .pause(1000)
      .waitForElementVisible('.toast-message')
      .pause(500)
      .assert
      .containsText('.toast-message', 'Recipe favourited succesfully')
      .pause(1000),


  'Navigate to the user profile': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('li#dropdownLi')
      .pause(1000)
      .waitForElementVisible('div.dropdown-menu.show')
      .pause(1000)
      .click('a#profileLink')
      .pause(1000)
      .waitForElementVisible('div#recipes')
      .pause(1000),


  'Edit user profile': browser =>
    browser
      .click('button#profileEdit')
      .pause(1000)
      .setValue('input[name=fullname]', 'test name')
      .pause(1000)
      .setValue('input[name=username]', 'test username')
      .pause(1000)
      .click('button#profileSubmit')
      .pause(1000)
      .click('button#profileEdit')
      .pause(1000)
      .click('button#profileCancel')
      .pause(1000),

  'Navigate to the user recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('li#dropdownLi')
      .pause(1000)
      .waitForElementVisible('div.dropdown-menu.show')
      .pause(1000)
      .click('a#userRecipesLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000),

  'Navigate to the user favourites': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('li#dropdownLi')
      .pause(1000)
      .waitForElementVisible('div.dropdown-menu.show')
      .pause(1000)
      .click('a#userFavouritesLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000),

  'Remove recipe from user favourites': browser =>
    browser
      .click('button#removeButton')
      .pause(1000)
      .waitForElementVisible('#react-confirm-alert')
      .pause(1000)
      // eslint-disable-next-line
      .assert.containsText('.react-confirm-alert > h3', 'Are you sure you want to remove this recipe ?')
      .click('.react-confirm-alert-button-group > button:nth-of-type(2)')
      .pause(1000)
      .waitForElementVisible('.toast-message')
      .pause(1000)
      .assert
      .containsText('.toast-message', 'Recipe removed from Favourite')
      .pause(1000)
      .end()
};

