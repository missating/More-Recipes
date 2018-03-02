import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import searchRecipes from '../../actions/searchRecipe';
import {
  SEARCH_RECIPES,
  SET_FETCHING,
  UNSET_FETCHING,
  SHOW_PAGINATION,
  SEARCH_RECIPES_ERROR
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Search all recipes', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch search results to store if request is succesful',
    (done) => {
      const recipes = {
        name: 'search test',
        ingredients: 'test, test, test',
        description: 'mix it'
      };

      const searchQuery = 'test';
      const pageNumber = 1;
      const Limit = 6;
      const CurrentPage = 1;
      const NumberOfItems = 1;
      const Pages = 1;
      moxios.stubRequest(`/api/v1/recipes/search?search=${searchQuery}&page=${pageNumber}`, {
        status: 200,
        response: {
          status: 'success',
          recipes,
          Limit,
          NumberOfItems,
          Pages,
          CurrentPage
        }
      });
      const store = mockStore({});
      store.dispatch(searchRecipes(searchQuery)).then(() => {
        // console.log('========', store.getActions());
        expect(store.getActions()[0].type).toEqual(SET_FETCHING);
        expect(store.getActions()[1].type).toEqual(SEARCH_RECIPES);
        expect(store.getActions()[1].recipes).toEqual(recipes);
        expect(store.getActions()[3].type).toEqual(UNSET_FETCHING);
        expect(store.getActions()[2].type).toEqual(SHOW_PAGINATION);
      });
      done();
    }
  );

  it('Should dispatch error message if request fails', (done) => {
    const searchQuery = 'test';
    const pageNumber = 1;
    const message = 'No recipes found';
    moxios.stubRequest(`/api/v1/recipes/search?search=${searchQuery}&page=${pageNumber}`, {
      status: 400,
      response: {
        message
      }
    });
    const store = mockStore({});
    store.dispatch(searchRecipes(searchQuery)).then(() => {
      expect(store.getActions()[0].type).toEqual(SET_FETCHING);
      expect(store.getActions()[1].type).toEqual(SEARCH_RECIPES_ERROR);
      expect(store.getActions()[2].type).toEqual(UNSET_FETCHING);
    });
    done();
  });
});

