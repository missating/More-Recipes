import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import signup from '../../actions/signup';
import {
  SET_FETCHING,
  RECEIVE_AUTH,
  AUTH_ERROR,
  UNSET_FETCHING
} from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('SIGN UP Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(
    'Should dispatch sign up to the store if request is sucessful',
    (done) => {
      const formData = {
        fullname: 'test',
        username: 'test',
        email: 'test@test.com',
        password: '1234567890',
        confirmPassword: '1234567890'
      };

      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: {
          status: 'success',
          user: formData,
          token: localStorage.token,
          message: 'Account created',
        }
      });

      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: RECEIVE_AUTH,
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
      store.dispatch(signup(formData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
          done();
        });
    }
  );

  it('dispatch error message to store if request is unsucessful', (done) => {
    const formData = {
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      password: '1234567890',
      confirmPassword: '1234567890'
    };
    moxios.stubRequest('/api/v1/users/signup', {
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
    store.dispatch(signup(formData))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
        expect(store.getActions().length).toBe(3);
        done();
      });
  });
});

