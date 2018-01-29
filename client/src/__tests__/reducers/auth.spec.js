import authReducer from '../../reducers/auth';
import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
  isAuthenticated: false
};

describe('Auth reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should set authenticated to false and return the initial state',
      () => {
        const action = {};

        const expected = {
          isAuthenticated: false
        };

        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
      }
    );
  });

  describe('CASE: RECEIVE_AUTH', () => {
    it(
      'Should set authenticated to true and receives details from user',
      () => {
        const user = {
          fullname: 'Test test',
          username: 'test',
          email: 'test@test.com',
          password: '1234567890',
          confirmPassword: '1234567890'
        };

        const action = {
          type: ActionTypes.RECEIVE_AUTH,
          errorMessage: '',
          user,
          token
        };

        const expected = {
          isAuthenticated: true,
          errorMessage: '',
          user,
          token
        };

        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
      }
    );
  });

  describe('CASE: AUTH_ERROR', () => {
    it(
      'Should set authenticated to false and return the error message',
      () => {
        // const message = 'Email already exist';
        const action = {
          type: ActionTypes.AUTH_ERROR,
          message: 'Email already exist',
        };

        const expected = {
          isAuthenticated: false,
          errorMessage: 'Email already exist',
        };

        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
      }
    );
  });
});
