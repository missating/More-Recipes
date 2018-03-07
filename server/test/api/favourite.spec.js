import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);

let userToken;
let recipeId;

describe('FAVOURITE API', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'test4',
        username: 'test4',
        email: 'test4@test.com',
        password: '1234567890',
        confirmPassword: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('token', userToken)
      .send({
        name: 'Test Recipe 3',
        ingredients: 'test, test, test',
        description: 'For testing recipe 3',
        // eslint-disable-next-line
        recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
      })
      .end((error, response) => {
        recipeId = response.body.recipe.id;
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.recipe.name).to.equal('Test Recipe 3');
        expect(response.body.recipe.ingredients)
          .to.equal('test, test, test');
        expect(response.body.recipe.description)
          .to.equal('For testing recipe 3');
        expect(response.body.recipe.recipeImage)
          .to.be.a('string');
        expect(response.body.recipe.id)
          .to.be.a('number');
        expect(response.body.recipe.userId)
          .to.be.a('number');
        done();
      });
  });

  describe('Add favourite', () => {
    it(
      'Should not allow non auth user to add a recipe as favourite',
      (done) => {
        chai.request(app)
          .post(`/api/v1/users/${recipeId}/favourite`)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Unauthorized.');
            done();
          });
      }
    );

    it(
      'Should not add a recipe that doesn\'t exist, as a favourite',
      (done) => {
        chai.request(app)
          .post('/api/v1/users/10/favourite')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('recipe does not exist in catalogue');
            done();
          });
      }
    );

    it(
      'Should allow auth user to add a recipe as favourite',
      (done) => {
        chai.request(app)
          .post(`/api/v1/users/${recipeId}/favourite`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('recipe favourited');
            expect(response.body.addedFavourite.name)
              .to.equal('Test Recipe 3');
            expect(response.body.addedFavourite.ingredients)
              .to.equal('test, test, test');
            expect(response.body.addedFavourite.description)
              .to.equal('For testing recipe 3');
            expect(response.body.addedFavourite.recipeImage)
              .to.be.a('string');
            expect(response.body.addedFavourite.id)
              .to.be.a('number');
            expect(response.body.addedFavourite.userId)
              .to.be.a('number');
            expect(response.body).to.have.property('addedFavourite');
            done();
          });
      }
    );

    it(
      'Should not add a recipeId that is not a number as favourite',
      (done) => {
        chai.request(app)
          .post('/api/v1/users/recipeId/favourite')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.error.recipeId)
              .to.include('RecipeId must be a number');
            done();
          });
      }
    );
  });

  describe('Get favourite', () => {
    it(
      'Should not allow non auth user to get all favourited recipes',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/favourites')
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Unauthorized.');
            done();
          });
      }
    );

    it(
      'Should allow auth user to get all favourited recipes',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/favourites')
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.numberOfItems)
              .to.be.a('number');
            expect(response.body.limit)
              .to.be.a('number');
            expect(response.body.currentPage)
              .to.be.a('number');
            expect(response.body.pages)
              .to.be.a('number');
            expect(response.body.favourites)
              .to.be.an('array').with.lengthOf(1);
            expect(response.body)
              .to.have.property('favourites').with.lengthOf(1);
            done();
          });
      }
    );

    it(
      'Should allow auth user remove recipe from favourite',
      (done) => {
        chai.request(app)
          .post(`/api/v1/users/${recipeId}/favourite`)
          .set('token', userToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('Recipe removed from favourite');
            done();
          });
      }
    );
  });
});
