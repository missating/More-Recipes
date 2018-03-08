const config = require('./config');
const faker = require('faker');

const title = faker.lorem.words(2);


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
      .setValue('input[name=fullname]', 'test user')
      .pause(1000)
      .setValue('input[name=username]', 'test')
      .pause(1000)
      .setValue('input[name=email]', 'testuser@test.com')
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

  'Create new Recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#createRecipeLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .setValue('input[name=name]', title)
      .pause(1000)
      .setValue('input[name=ingredients]', 'test, test')
      .pause(1000)
      .setValue('textarea[name=description]', faker.lorem.paragraphs())
      .pause(1000)
      .click('#recipeButton')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000),

  'Create new Recipe 2': browser =>
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
      .pause(1000),

  'Return error for recipe with the same name': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#createRecipeLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .setValue('input[name=name]', title)
      .pause(1000)
      .setValue('input[name=ingredients]', 'test, test')
      .pause(1000)
      .setValue('textarea[name=description]', faker.lorem.paragraphs())
      .pause(1000)
      .click('#recipeButton')
      .pause(1000)
      .waitForElementVisible('.toast-message')
      .pause(500)
      .assert
      // eslint-disable-next-line
      .containsText('.toast-message', 'You already have a recipe with this name')
      .pause(1000),

  'Returns error for incomplete field': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#createRecipeLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .setValue('input[name=name]', title)
      .pause(1000)
      .setValue('input[name=ingredients]', 'test, test')
      .pause(1000)
      .setValue('textarea[name=description]', '')
      .pause(1000)
      .click('#recipeButton')
      // eslint-disable-next-line
      .assert.containsText('#recipeDescriptionError', 'Recipe should have a decription')
      .pause(1000)
      .click('#cancelButton')
      .waitForElementVisible('section#recipes')
      .pause(1000),

  'Update a Recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#editRecipe')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .setValue('input[name=ingredients]', ' ,new test, new test')
      .pause(1000)
      .click('#editButton')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000),


  'Delete a Recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('button#deleteButton')
      .waitForElementVisible('#react-confirm-alert')
      .pause(1000)
      // eslint-disable-next-line
      .assert.containsText('.react-confirm-alert > h3', 'Are you sure you want to delete this recipe ?')
      .click('.react-confirm-alert-button-group > button:nth-of-type(2)')
      .pause(1000)
      .waitForElementVisible('.toast-message')
      .pause(1000)
      .assert
      .containsText('.toast-message', 'Recipe deleted succesfully')
      .pause(1000)
      .end()
};

