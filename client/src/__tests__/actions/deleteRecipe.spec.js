import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import deleteRecipe from '../../actions/deleteRecipe';
import {
  SET_FETCHING,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Delete Recipe Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it.only(
    'Should dispatch delete recipe to the store if request is sucessful',
    (done) => {
      const recipeId = 1;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 200,
        response: {
          status: 'success',
          message: 'recipe deleted'
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: DELETE_RECIPE,
          recipeId
        },
        { type: UNSET_FETCHING },
        { type: SET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(deleteRecipe(recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(4);
          done();
        });
    }
  );


  it('dispatch error message to store if request is unsucessful', (done) => {
    const recipeId = 1;
    moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: DELETE_RECIPE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(deleteRecipe(recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

