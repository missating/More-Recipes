import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import editRecipe from '../../actions/editRecipe';
import {
  SET_FETCHING,
  EDIT_RECIPE,
  EDIT_RECIPE_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Edit Recipe Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it(
    'Should dispatch edit recipe to the store if request is sucessful',
    (done) => {
      const recipe = {
        name: 'test',
        ingredients: 'test, test, test',
        description: 'mix all together',
      };

      const recipeId = 1;
      moxios.stubRequest(`/api/v1/recipes/${recipeId}`, {
        status: 200,
        response: {
          status: 'success',
          message: 'Update successful',
          recipe
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: EDIT_RECIPE,
          recipe
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(editRecipe(recipe, recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );


  it('dispatch error message to store if request is unsucessful', (done) => {
    const recipe = {
      name: 'test',
      ingredients: 'test, test, test',
      description: 'mix all together',
    };

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
        type: EDIT_RECIPE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(editRecipe(recipe, recipeId))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});
