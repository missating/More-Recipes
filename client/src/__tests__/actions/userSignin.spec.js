import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import userSignin from '../../actions/userSignIn';
import {
  SET_FETCHING,
  SIGN_IN_USER,
  AUTH_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('SIGN IN Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch sign in to the store if request is sucessful',
    (done) => {
      const formData = {
        email: 'test@test.com',
        password: '1234567890',
      };

      moxios.stubRequest('/api/v1/users/signin', {
        status: 201,
        response: {
          status: 'success',
          foundUser: formData,
          token: localStorage.token,
        }
      });

      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: SIGN_IN_USER,
          isAuthenticated: true,
          user: formData,
          token: localStorage.token
        },
        { type: UNSET_FETCHING }
      ];

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(formData));
      expect(localStorage.getItem('token')).toEqual(token);
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(formData));

      const store = mockStore({});
      store.dispatch(userSignin(formData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    const formData = {
      email: 'test@test.com',
      password: '1234567890',
    };
    moxios.stubRequest('/api/v1/users/signin', {
      status: 500,
      response: {
        status: 'error',
        message: 'Internal server error'
      }
    });
    const expected = [
      { type: SET_FETCHING },
      {
        type: AUTH_ERROR,
        isAuthenticated: false,
        message: 'Internal server error'
      },
      { type: UNSET_FETCHING }
    ];

    const store = mockStore({});
    store.dispatch(userSignin(formData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

