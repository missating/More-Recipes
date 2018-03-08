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
      .pause(1000)
      .click('#signout'),

  'Returns error for incomplete fields': browser =>
    browser
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('#sigupButton')
      .pause(1000)
      .setValue('input[name=fullname]', '')
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
      .assert.containsText('#fullnameError', 'fullname is required')
      .pause(1000),


  'Returns error for invalid credentials': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('#signinButton')
      .pause(1000)
      .setValue('input#signinEmail', email)
      .pause(1000)
      .setValue('input#signinPassword', '')
      .pause(1000)
      .click('#loginButton')
      .assert
      .containsText('#passwordError', 'Invalid credentials. Please try again')
      .pause(1000),


  'Logs a user in': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .pause(1000)
      .waitForElementVisible('div.main-cont')
      .pause(1000)
      .click('#signinButton')
      .pause(1000)
      .setValue('input#signinEmail', email)
      .pause(1000)
      .setValue('input#signinPassword', '123456')
      .pause(1000)
      .click('#loginButton')
      .pause(1000)
      .waitForElementVisible('button#signout')
      .pause(1000)
      .assert.containsText('button#signout', 'SIGN OUT')
      .pause(1000)
      .end()
};
