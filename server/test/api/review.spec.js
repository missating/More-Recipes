import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';

chai.use(chaiHttp);

let userToken;
let recipeId;

describe('User sign up for add review test', () => {
  const signupUrl = '/api/v1/users/signup';
  it('Should register a new user with the correct credentails', (done) => {
    chai.request(app)
      .post(signupUrl)
      .send({
        fullname: 'test3',
        username: 'test3',
        email: 'test3@test.com',
        password: '1234567890',
        confirmPassword: '1234567890'
      })
      .end((error, response) => {
        userToken = response.body.token;
        expect(response.status).to.equal(201);
        done();
      });
  });
});

describe('Add recipe for add review test', () => {
  const recipeUrl = '/api/v1/recipes';
  it('Should allow auth users to add recipe to catalog', (done) => {
    chai.request(app)
      .post(recipeUrl)
      .set('token', userToken)
      .send({
        name: 'Test Recipe 2',
        ingredients: 'test, test, test',
        description: 'For testing recipe 2'
      })
      .end((error, response) => {
        recipeId = response.body.recipe.id;
        expect(response.status).to.equal(201);
        expect(response.body.recipe.name).to.equal('Test Recipe 2');
        expect(response.body.recipe.ingredients)
          .to.equal('test, test, test');
        expect(response.body.recipe.description)
          .to.equal('For testing recipe 2');
        done();
      });
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
        expect(response.body.message).to.equal('Please add a review');
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
        expect(response.body.review.content).to.equal('Good stuff');
        done();
      });
  });

  it('Should not add review for a recipeId that is not a number', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/recipeId/review`)
      .set('token', userToken)
      .send({
        content: 'Good stuff'
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('RecipeId must be a number');
        done();
      });
  });
});
