import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
let user = {};
let recipe = {};
let user2;
let userToken;
let recipeId;


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
        .get('/this/is/an/unknown/route')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('user signup', () => {
    const signupUrl = '/api/v1/users/signup';
    beforeEach(() => {
      user = {
        fullname: 'John Doe',
        username: 'jhonny',
        email: 'nessa@test.com',
        password: '1234567890',
        confirmPassword: '1234567890'
      };
    });
    it('Should register a new user', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });


    it('Should register another new user', (done) => {
      user2 = Object.assign({}, user);
      user2.email = 'test5@test.com';
      chai.request(app)
        .post(signupUrl)
        .send(user2)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('Should return 403 for an already existing email.', (done) => {
      const sameData = Object.assign({}, user);
      sameData.fullname = 'Jane doe';
      chai.request(app)
        .post(signupUrl)
        .send(sameData)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 400 if no fullname is passed.', (done) => {
      const noFullname = Object.assign({}, user);
      delete noFullname.fullname;
      chai.request(app)
        .post(signupUrl)
        .send(noFullname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('return 400 for if password is less than 6 characters', (done) => {
      const sameData = Object.assign({}, user);
      sameData.password = '12345';
      chai.request(app)
        .post(signupUrl)
        .send(sameData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return 400 if no password is passed', (done) => {
      const noPassword = Object.assign({}, user);
      delete noPassword.password;
      chai.request(app)
        .post(signupUrl)
        .send(noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return 400 for an incorrect email address', (done) => {
      const wrongEmail = Object.assign({}, user);
      wrongEmail.email = 'verywrongemailyahoo.com';
      chai.request(app).post(signupUrl)
        .send(wrongEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('user signin', () => {
    const signinUrl = '/api/v1/users/signin';

    beforeEach(() => {
      user = {
        email: 'nessa@test.com',
        password: '1234567890'
      };
    });

    // yoyoy
    it('Should sign in a user', (done) => {
      chai.request(app).post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should return 400 if no email is provided on sign in', (done) => {
      const noEmail = Object.assign({}, user);
      delete noEmail.email;
      chai.request(app)
        .post(signinUrl)
        .send(noEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 400 if no password is provided on sign in', (done) => {
      const noPassword = Object.assign({}, user);
      delete noPassword.password;
      chai.request(app)
        .post(signinUrl)
        .send(noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('return 401 for wrong password', (done) => {
      const wrongPassword = Object.assign({}, user);
      wrongPassword.password = 'wrongpassword';
      chai.request(app)
        .post(signinUrl)
        .send(wrongPassword)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('Add Recipe', () => {
    // const recipeUrl = '/api/v1/recipes';
    beforeEach(() => {
      recipe = {
        name: 'Test Recipe',
        ingredients: 'Rice,Tomatoes',
        description: 'For testing the recipe'
      };
    });

    it('Should return 400 if no recipe name is provided.', (done) => {
      const noName = Object.assign({}, recipe);
      delete noName.name;
      chai.request(app).post(`/api/v1/recipes?token=${userToken}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 400 if no description is provided', (done) => {
      const noDescription = Object.assign({}, recipe);
      delete noDescription.description;
      chai.request(app).post(`/api/v1/recipes?token=${userToken}`)
        .send(noDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 400 if Ingredients are not provided', (done) => {
      const noIngredient = Object.assign({}, recipe);
      delete noIngredient.ingredients;
      chai.request(app).post(`/api/v1/recipes?token=${userToken}`)
        .send(noIngredient)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('return 201 for a successful recipe creation', (done) => {
      chai.request(app).post(`/api/v1/recipes?token=${userToken}`)
        .send(recipe)
        .end((err, res) => {
          recipeId = res.body.recipe.id;
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
