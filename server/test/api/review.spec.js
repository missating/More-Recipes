import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);

let userToken;
let recipeId;

describe('REVIEW API', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        fullname: 'test3',
        username: 'test3',
        email: 'test3@test.com',
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
        name: 'Test Recipe 2',
        ingredients: 'test, test, test',
        description: 'For testing recipe 2',
        recipeImage: 'https://res.cloudinary.com/dxayftnxb/image/upload/v1517243643/moowry8hawjedgvgaeo0.png'
      })
      .end((error, response) => {
        recipeId = response.body.recipe.id;
        expect(response.status).to.equal(201);
        expect(response.body.recipe.name).to.equal('Test Recipe 2');
        expect(response.body.recipe.ingredients)
          .to.equal('test, test, test');
        expect(response.body.recipe.description)
          .to.equal('For testing recipe 2');
        expect(response.body.recipe.recipeImage)
          .to.be.a('string');
        expect(response.body.recipe.id)
          .to.be.a('number');
        expect(response.body.recipe.userId)
          .to.be.a('number');
        done();
      });
  });

  describe('Add review', () => {
    it(
      'Should not allow non auth user to add a review for a recipe',
      (done) => {
        chai.request(app)
          .post(`/api/v1/recipes/${recipeId}/review`)
          .send({
            content: 'Good stuff!'
          })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Unauthorized.');
            done();
          });
      }
    );

    it('Should not add review with an empty content field', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/review`)
        .set('token', userToken)
        .send({
          content: ''
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.content)
            .to.include('Please add a review');
          done();
        });
    });

    it('Should allow auth user to add a review for a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${recipeId}/review`)
        .set('token', userToken)
        .send({
          content: 'Good stuff'
        })
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.review.content).to.equal('Good stuff');
          done();
        });
    });

    it('Should not add review for a recipeId that is not a number', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/recipeId/review')
        .set('token', userToken)
        .send({
          content: 'Good stuff'
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.recipeId)
            .to.include('RecipeId must be a number');
          done();
        });
    });
  });
});
