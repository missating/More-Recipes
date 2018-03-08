const config = require('./config');

module.exports = {
  'Logs a user in': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('#signinButton')
      .pause(1000)
      .setValue('input#signinEmail', 'testuser@test.com')
      .pause(1000)
      .setValue('input#signinPassword', '123456')
      .pause(1000)
      .click('#loginButton')
      .pause(1000)
      .waitForElementVisible('button#signout')
      .pause(1000)
      .assert.containsText('button#signout', 'SIGN OUT')
      .pause(1000),

  'View all recipes': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#recipesLink')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000),

  'View a single recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('a#viewRecipe')
      .pause(1000)
      .waitForElementVisible('section#recipes')
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

  'Upvote a single recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('button#onUpvote')
      .pause(1000)
      .waitForElementVisible('.toast-message')
      .pause(500)
      .assert
      .containsText('.toast-message', 'Recipe upvoted successfully')
      .pause(1000),

  'Downvote a single recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('button#onDownvote')
      .pause(1000)
      .waitForElementVisible('.toast-message')
      .pause(500)
      .assert
      .containsText('.toast-message', 'Recipe downvoted successfully')
      .pause(1000),

  'Returns error for incomplete fields': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .setValue('textarea[name=content]', '')
      .pause(1000)
      .click('#submitReview')
      .assert.containsText('#reviewError', 'Please add a review')
      .pause(1000),

  'Add a review for a recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .setValue('textarea[name=content]', 'Good stuff')
      .pause(1000)
      .click('#submitReview')
      .waitForElementVisible('div.reviews')
      .pause(1000)
      .end()
};

