import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import editUserProfile from '../../actions/editUserProfile';
import {
  SET_FETCHING,
  EDIT_USER_PROFILE,
  EDIT_USER_PROFILE_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Edit User Profile Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it(
    'Should dispatch edit user profile to the store if request is sucessful',
    (done) => {
      const userDetails = {
        fullname: 'test',
        username: 'testy',
      };

      moxios.stubRequest('api/v1/users/profile', {
        status: 200,
        response: {
          status: 'success',
          user: userDetails
        }
      });

      const expected = [
        { type: SET_FETCHING },
        {
          type: EDIT_USER_PROFILE,
          user: userDetails
        },
        { type: UNSET_FETCHING }
      ];

      const store = mockStore({});
      store.dispatch(editUserProfile(userDetails))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );


  it('dispatch error message to store if request is unsucessful', (done) => {
    const userDetails = {
      fullname: 'test',
      username: 'testy',
    };

    moxios.stubRequest('api/v1/users/profile', {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: EDIT_USER_PROFILE_ERROR,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(editUserProfile(userDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});
