import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getUserRecipes from '../../actions/getUserRecipes';
import {
  SET_FETCHING,
  GET_USER_RECIPES,
  GET_USER_RECIPES_ERROR,
  SHOW_PAGINATION,
  UNSET_FETCHING,
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Get user recipes action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch all user recipes to store if request is successful',
    (done) => {
      const recipes = {
        recipes: {
          name: 'test recipe',
          ingredients: 'test, test, test',
          description: 'mix stuff together'
        }
      };
      const pageNumber = 1;
      const limit = 6;
      const currentPage = 1;
      const numberOfItems = 1;
      const pages = 1;
      moxios.stubRequest(`/api/v1/recipes/user/recipes?page=${pageNumber}`, {
        status: 200,
        response: {
          status: 'success',
          recipes,
          limit,
          numberOfItems,
          pages,
          currentPage
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: GET_USER_RECIPES,
          recipes
        },
        {
          type: SHOW_PAGINATION,
          details: {
            limit: 6, numberOfItems: 1, currentPage: 1, pages: 1
          }
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(getUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(4);
        });
      done();
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    moxios.stubRequest(`/api/v1/recipes/user/recipes?page=${1}`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: GET_USER_RECIPES_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(getUserRecipes())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
      });
    done();
  });
});

