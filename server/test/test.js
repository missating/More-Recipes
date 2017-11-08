process.env.NODE_ENV = 'test';

import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app';

const expect = chai.expect;

chai.use(chaiHttp);

const userSignup = '/api/v1/users/signup';
const userSignin = '/api/v1/users/signin';
let user = {};
let data = {};
let userToken;

describe('API Endpoints testing', () => {
  describe('GET /', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 404 for unknown routes', (done) => {
      chai.request(app)
        .get('/some/very/useless/route')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('Create a new User.', () => {
    beforeEach(() => {
      user = {
        username: 'vanessa',
        email: 'email@gmail.com',
        password: 'password12345',
      };
    });
    it('Should return 201 for successfull user creation.', () => {
      chai.request(app)
        .post(userSignup)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
    it('Should return 400 for an already existing email.', () => {
      const sameData = Object.assign({}, user);
      chai.request(app).post(userSignup)
        .send(sameData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no email is passed.', () => {
      const noEmail = Object.assign({}, user);
      delete noEmail.email;
      chai.request(app).post(userSignup)
        .send(noEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no password is entered.', () => {
      const noPassword = Object.assign({}, user);
      delete noPassword.password;
      chai.request(app).post(userSignup)
        .send(noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no username is provided.', () => {
      const noUsername = Object.assign({}, user);
      delete noUsername.username;
      chai.request(app).post(userSignup)
        .send(noUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
  });
  describe('User sign in', () => {
    beforeEach(() => {
      user = {
        email: 'sudoku@gmail.com',
        password: '123456',
      };
    });
    it('Should return 201 for a successful login', () => {
      chai.request(app).post(userSignin)
        .send(user)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(201);
        });
    });
    it('Should return 400 if no email is provided on sign in', () => {
      const noEmail = Object.assign({}, user);
      delete noEmail.email;
      chai.request(app).post(userSignin)
        .send(noEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no password is provided on sign in', () => {
      const noPassword = Object.assign({}, user);
      delete noPassword.password;
      chai.request(app).post(userSignin)
        .send(noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 403 for a wrong password', () => {
      const wrongPassword = Object.assign({}, user);
      wrongPassword.password = 'veryWrongPassword';
      chai.request(app).post(userSignin)
        .send(wrongPassword)
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
    it('Should return 403 for an incorrect email address', () => {
      const wrongEmail = Object.assign({}, user);
      wrongEmail.email = 'verywrongemail@yahoo.com';
      chai.request(app).post(userSignin)
        .send(wrongEmail)
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
  });
  describe('Add Recipe', () => {
    beforeEach(() => {
      data = {
        name: 'Ghana Jollof',
        description: 'Best Jollof in the world',
        category: 'Lunch',
        ingredients: ['Rice', 'Tomatoes'],
        instructions: ['Cook this shii well'],
      };
    });
    it('Should return 403 if no token is supplied before adding a recipe', () => {
      chai.request(app).post('/api/v1/recipes')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
    it('Should return 400 if no recipe name is provided.', () => {
      const noName = Object.assign({}, data);
      delete noName.name;
      chai.request(app).post('/api/v1/recipes')
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no description is provided', () => {
      const noDescription = Object.assign({}, data);
      delete noDescription.description;
      chai.request(app).post('/api/v1/recipes')
        .send(noDescription)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if Ingredients are not provided', () => {
      const noIngredient = Object.assign({}, data);
      delete noIngredient.ingredients;
      chai.request(app).post('/api/v1/recipes')
        .send(noIngredient)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(400);
        });
    });
  });
  describe('API to Get all recipes', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 200 for sorted recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=up&order=des')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('API to update recipe', () => {
    it('Should return 403 for unauthorized', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'A new name',
          ingredients: 'Some ingredients',
          description: 'some new description'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
  describe('Test for Token', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'kt@gmail.com', password: '123456' })
        .end((err, res) => {
          userToken = res.body.token;
          done();
        });
    });
    it('Should allow user view recipe details with token', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/13')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
        .end((err, res) => {
          expect(res.status).to.not.equal(401);
          done();
        });
    });
  });
  describe('test for upvote', () => {
    it('should not allow for recipe that doesn\'t exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/upvote/33')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('Test for Reviews', () => {
    it('should not allow review for invalid recipes ', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/14/review')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
        .send({ content: 'this is a test review' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
