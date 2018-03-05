import userProfileReducer from '../../reducers/userProfile';
import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
  fullname: '',
  username: '',
  email: '',
  joined: ''
};


describe('User profile reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should set profile to their initial values and return the initial state',
      () => {
        const newState = userProfileReducer(undefined, {});
        expect(newState).toEqual(initialState);
      }
    );
  });

  describe('CASE: GET_USER_PROFILE', () => {
    it(
      'Should get user profile when action is called',
      () => {
        const user = {
          fullname: 'Test',
          username: 'test',
          email: 'test@test.com',
          joined: new Date().toDateString()
        };
        const action = {
          type: ActionTypes.GET_USER_PROFILE,
          user
        };
        const newState = userProfileReducer(initialState, action);
        expect(newState).toEqual(user);
      }
    );
  });


  describe('CASE: GET_USER_PROFILE_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_USER_PROFILE_ERROR,
        message: 'internal server error'
      };

      const newState = userProfileReducer(initialState, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });

  describe('CASE: EDIT_USER_PROFILE', () => {
    it(
      'Should edit user profile when action is called',
      () => {
        const user = {
          fullname: 'Test',
          username: 'test',
          email: 'test@test.com',
          joined: new Date().toDateString()
        };
        const action = {
          type: ActionTypes.EDIT_USER_PROFILE,
          user
        };
        const newState = userProfileReducer(initialState, action);
        expect(newState).toEqual(user);
      }
    );
  });


  describe('CASE: EDIT_USER_PROFILE_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.EDIT_USER_PROFILE_ERROR,
        message: 'internal server error'
      };

      const newState = userProfileReducer(initialState, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });
});
