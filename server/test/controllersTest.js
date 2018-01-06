import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);
let user = {};
let recipe = {};
let review = {};
let userProfile = {};
let user2;
let userToken;
let userToken2;
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

    it('Should sign in a user', (done) => {
      chai.request(app).post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should sign in another user', (done) => {
      chai.request(app).post('/api/v1/users/signin')
        .send(user2)
        .end((err, res) => {
          userToken2 = res.body.token;
          expect(res.status).to.equal(200);
          done();
        });
    });


    it('Should return 404 if a user signs in with an email that does not exist', (done) => {
      const newEmail = Object.assign({}, user);
      newEmail.email = 'newtest@test.com';
      chai.request(app).post('/api/v1/users/signin')
        .send(newEmail)
        .end((err, res) => {
          expect(res.status).to.equal(404);
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

  describe('View a user\'s profile', () => {
    it('Should return 200 if anybody views a user\'s profile', (done) => {
      chai.request(app)
        .get(`/api/v1/users/profile?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should return 404 if anybody tries to view a user\'s profile that does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/users/4')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });


  describe('update user\'s profile', () => {
    beforeEach(() => {
      userProfile = {
        fullname: 'Andrew Doe',
        username: 'janejane',
        email: 'jane@test.com',
      };
    });

    it('Should return 403 if a non auth user tries to update a user profile', (done) => {
      chai.request(app)
        .put('/api/v1/users/profile')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 200 if an auth user tries to update his/her profile', (done) => {
      chai.request(app)
        .put(`/api/v1/users/profile?token=${userToken}`)
        .send(userProfile)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('Add Recipe', () => {
    const recipeUrl = '/api/v1/recipes';
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
      chai.request(app).post(`${recipeUrl}?token=${userToken}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 400 if no description is provided', (done) => {
      const noDescription = Object.assign({}, recipe);
      delete noDescription.description;
      chai.request(app).post(`${recipeUrl}?token=${userToken}`)
        .send(noDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 400 if Ingredients are not provided', (done) => {
      const noIngredient = Object.assign({}, recipe);
      delete noIngredient.ingredients;
      chai.request(app).post(`${recipeUrl}?token=${userToken}`)
        .send(noIngredient)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 201 for a successful recipe creation', (done) => {
      chai.request(app).post(`${recipeUrl}?token=${userToken}`)
        .send(recipe)
        .end((err, res) => {
          recipeId = res.body.recipe.id;
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('Update a recipe', () => {
    beforeEach(() => {
      recipe = {
        name: 'Test Recipe again',
        ingredients: 'Rice,Tomatoes, salad',
        description: 'For testing the recipe again'
      };
    });

    it('Should return 404 if a recipe with the id a user wants to update is not found', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/2?token=${userToken}`)
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('Should return 403 if a non auth user tries to update a recipe', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 200 if an auth user successfully updates a recipe', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}?token=${userToken}`)
        .send(recipe)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });


  describe('Get all recipe', () => {
    it('Should get all recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should get all recipe by a particular user', (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/user/allrecipes?token=${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });


  describe('Add a review', () => {
    beforeEach(() => {
      review = {
        content: 'Amazing food, keep it up'
      };
    });
    it('Should return 400 if review is not provided', (done) => {
      const noContent = Object.assign({}, review);
      delete noContent.content;
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/review?token=${userToken}`)
        .send(noContent)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Should return 403 if a non auth user tries to add a review', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/review`)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 201 if an auth user successfully adds a review', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/review?token=${userToken}`)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('Add Favourites', () => {
    it('Should return 403 if a non auth user tries to favourite a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${recipeId}/favourite`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 404 if a recipe is not found', (done) => {
      chai.request(app)
        .post(`/api/v1/users/8/favourite?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('Should return 200 if user successfully favourites a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${recipeId}/favourite?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should return 403 if a user has already favourited a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/users/${recipeId}/favourite?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('Get all favourites', () => {
    it('Should return 403 if a non auth user tries to get all favourite', (done) => {
      chai.request(app)
        .get('/api/v1/users/favourites')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 200 if a user has favourite recipes', (done) => {
      chai.request(app)
        .get(`/api/v1/users/favourites?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should return 404 if a user has no favourite recipes', (done) => {
      chai.request(app)
        .get(`/api/v1/users/favourites?token=${userToken2}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('Delete a recipe', () => {
    it('Should return 404 if a recipe with the id a user wants to delete is not found', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/2?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('Should return 403 if a non auth user tries to delete a recipe', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('Should return 200 if an auth user successfully deletes a recipe', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}?token=${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
