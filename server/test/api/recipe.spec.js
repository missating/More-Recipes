import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);

let userToken;
let recipeId;
const userToken2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTE5MTI3NDc3fQ.jOZ8BYDMtc0M6ajJougAkN3Uq_NTI1mq7wwVb1ZaL2o';


describe('RECIPE CONTROLLER', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'test2',
        username: 'test2',
        email: 'test2@test.com',
        password: '1234567890',
        confirmPassword: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });

  describe('Add Recipe', () => {
    const recipeUrl = '/api/v1/recipes';
    it('Should not add a recipe with an empty name field', (done) => {
      chai.request(app)
        .post(recipeUrl)
        .set('token', userToken)
        .send({
          name: '',
          ingredients: 'test, test, test',
          description: 'For testing the recipe',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.name)
            .to.include('Recipe name is required');
          done();
        });
    });

    it('Should not add a recipe with an empty description field', (done) => {
      chai.request(app)
        .post(recipeUrl)
        .set('token', userToken)
        .send({
          name: 'Test Recipe',
          ingredients: 'test, test, test',
          description: '',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.description)
            .to.include('Description for recipe is required');
          done();
        });
    });

    it('Should not add a recipe with an empty ingredients field', (done) => {
      chai.request(app)
        .post(recipeUrl)
        .set('token', userToken)
        .send({
          name: 'Test Recipe',
          ingredients: '',
          description: 'For testing the recipe',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.ingredients)
            .to.include('ingredients for recipe is required');
          done();
        });
    });

    it('Should add a recipe without an empty image field', (done) => {
      chai.request(app)
        .post(recipeUrl)
        .set('token', userToken)
        .send({
          name: 'Test Recipe 1',
          ingredients: 'test, test, test',
          description: 'For testing the recipe',
        })
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Recipe created successfully');
          expect(response.body.recipe.id)
            .to.be.a('number');
          expect(response.body.recipe.name)
            .to.be.a('string');
          expect(response.body.recipe.userId)
            .to.be.a('number');
          expect(response.body.recipe.ingredients)
            .to.be.a('string');
          expect(response.body.recipe.description)
            .to.be.a('string');
          expect(response.body.recipe.recipeImage)
            .to.be.a('string');
          done();
        });
    });


    it('Should allow auth users to add recipe to catalog', (done) => {
      chai.request(app)
        .post(recipeUrl)
        .set('token', userToken)
        .send({
          name: 'Test Recipe',
          ingredients: 'test, test, test',
          description: 'For testing the recipe',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          recipeId = response.body.recipe.id;
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.recipe.name).to.equal('Test Recipe');
          expect(response.body.recipe.ingredients)
            .to.equal('test, test, test');
          expect(response.body.recipe.description)
            .to.equal('For testing the recipe');
          expect(response.body.recipe.recipeImage)
            .to.be.a('string');
          expect(response.body.recipe.id)
            .to.be.a('number');
          expect(response.body.recipe.userId)
            .to.be.a('number');
          done();
        });
    });

    it('Should not allow non auth user to add recipe to catalog', (done) => {
      chai.request(app)
        .post(recipeUrl)
        .send({
          name: 'Test Recipe',
          ingredients: 'test, test, test',
          description: 'For testing the recipe',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Unauthorized.');
          done();
        });
    });
  });

  describe('Update Recipe', () => {
    it('Should not update a recipe that does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/10')
        .set('token', userToken)
        .send({
          name: 'Another Test Recipe',
          ingredients: 'testing, testing, testing',
          description: 'For testing the recipe again',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it(
      'Should not allow non auth user to update a recipe in the catalog',
      (done) => {
        chai.request(app)
          .put(`/api/v1/recipes/${recipeId}`)
          .send({
            name: 'Another Test Recipe',
            ingredients: 'testing, testing, testing',
            description: 'For testing the recipe again',
            recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
          })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Unauthorized.');
            done();
          });
      }
    );

    it('Should allow auth user to update a recipe in the catalog', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${recipeId}`)
        .set('token', userToken)
        .send({
          name: 'Another Test Recipe',
          ingredients: 'testing, testing, testing',
          description: 'For testing the recipe again',
          recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
        })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.recipe.name).to.equal('Another Test Recipe');
          expect(response.body.recipe.ingredients)
            .to.equal('testing, testing, testing');
          expect(response.body.recipe.description)
            .to.equal('For testing the recipe again');
          expect(response.body.recipe.recipeImage)
            .to.be.a('string');
          expect(response.body.recipe.id)
            .to.be.a('number');
          expect(response.body.recipe.userId)
            .to.be.a('number');
          done();
        });
    });

    it(
      'Should not update a particular recipe for recipeId that is not a number',
      (done) => {
        chai.request(app)
          .put('/api/v1/recipes/recipeId')
          .set('token', userToken)
          .send({
            name: 'Another Test Recipe',
            ingredients: 'testing, testing, testing',
            description: 'For testing the recipe again',
            recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.recipeId)
              .to.include('RecipeId must be a number');
            done();
          });
      }
    );
  });


  describe('Get Recipe', () => {
    it('Should allow users to view all recipes in the catalog', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.numberOfItems)
            .to.be.a('number');
          expect(response.body.limit)
            .to.be.a('number');
          expect(response.body.currentPage)
            .to.be.a('number');
          expect(response.body.pages)
            .to.be.a('number');
          expect(response.body.recipes)
            .to.be.an('array').with.lengthOf(3);
          expect(response.body).to.have.property('recipes').with.lengthOf(3);
          done();
        });
    });

    it(
      'Should allow users to view a particular recipe in the catalog',
      (done) => {
        chai.request(app)
          .get(`/api/v1/recipes/${recipeId}`)
          .end((error, response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body.recipe)
              .to.be.an('object');
            expect(response.body).to.have.property('recipe');
            done();
          });
      }
    );

    it('Should allow auth user view all their recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/user/recipes')
        .set('token', userToken)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.numberOfItems)
            .to.be.a('number');
          expect(response.body.limit)
            .to.be.a('number');
          expect(response.body.currentPage)
            .to.be.a('number');
          expect(response.body.pages)
            .to.be.a('number');
          expect(response.body.recipes)
            .to.be.an('array').with.lengthOf(2);
          expect(response.body).to.have.property('recipes').with.lengthOf(2);
          done();
        });
    });


    it(
      'Should not allow a user that does not exist view all their recipes',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes/user/recipes')
          .set('token', userToken2)
          .end((error, response) => {
            expect(response).to.have.status(404);
            expect(response.body.message)
              .to.equal('A user with that id is not found');
            done();
          });
      }
    );


    it('Should not allow non auth user view all their recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/user/recipes')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Unauthorized.');
          done();
        });
    });

    it(
      'Should not get a particular recipe for recipeId that is not a number',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes/recipeId')
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.recipeId)
              .to.include('RecipeId must be a number');
            done();
          });
      }
    );
  });

  describe('Delete a recipe', () => {
    it('Should not delete a recipe that does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/10')
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.a('string');
          done();
        });
    });

    it('Should not allow a non auth user to delete a recipe', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}`)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Unauthorized.');
          done();
        });
    });

    it('Should allow an auth user delete a recipe', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${recipeId}`)
        .set('token', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('recipe deleted');
          done();
        });
    });

    it(
      'Should not delete a particular recipe for recipeId that is not a number',
      (done) => {
        chai.request(app)
          .get('/api/v1/recipes/recipeId')
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.recipeId)
              .to.include('RecipeId must be a number');
            done();
          });
      }
    );
  });

  describe('Search for a recipe', () => {
    it('Should return 404 for a recipe that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/search?search=eba')
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('No match(es) found');
          done();
        });
    });

    it('Should return 200 for a recipe that exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/search?search=test')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.numberOfItems)
            .to.be.a('number');
          expect(response.body.limit)
            .to.be.a('number');
          expect(response.body.currentPage)
            .to.be.a('number');
          expect(response.body.pages)
            .to.be.a('number');
          expect(response.body.recipes)
            .to.be.an('array').with.lengthOf(2);
          expect(response.body)
            .to.have.property('recipes').with.lengthOf(2);
          done();
        });
    });
  });
});
