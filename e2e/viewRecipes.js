const config = require('./config');

module.exports = {
  'View top recipes': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      // eslint-disable-next-line
      .click('svg.svg-inline--fa.fa-angle-double-down.fa-w-10.fa-3x.scroll-down')
      .pause(1000)
      .waitForElementVisible('section#featured')
      .pause(1000)
      .assert.containsText('h2#featuredHeading', 'Featured Recipes')
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

  'Search for a recipe': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .setValue('input[name=searchQuery]', 'no')
      .pause(1000)
      .waitForElementVisible('section#recipes')
      .pause(1000)
      .end()
};

