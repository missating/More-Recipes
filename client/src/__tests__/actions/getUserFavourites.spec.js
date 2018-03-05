import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getUserFavourites from '../../actions/getUserFavourites';
import {
  SET_FETCHING,
  GET_USER_FAVOURITE,
  GET_USER_FAVOURITE_ERROR,
  SHOW_PAGINATION,
  UNSET_FETCHING,
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Get user favourites action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch all user favourites to store if request is successful',
    (done) => {
      const favourites = {
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
      moxios.stubRequest(`/api/v1/users/favourites?page=${pageNumber}`, {
        status: 200,
        response: {
          status: 'success',
          favourites,
          limit,
          numberOfItems,
          pages,
          currentPage
        }
      });
      const expected = [
        { type: SET_FETCHING },
        {
          type: GET_USER_FAVOURITE,
          favourites
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
      store.dispatch(getUserFavourites())
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(4);
        });
      done();
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    moxios.stubRequest(`/api/v1/users/favourites?page=${1}`, {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: GET_USER_FAVOURITE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(getUserFavourites())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
      });
    done();
  });
});

