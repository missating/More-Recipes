import userFavouritesReducer from '../../reducers/userFavourites';
import * as ActionTypes from '../../actions/actionTypes';


describe('User favourites reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should set recipes to their initial values and return the initial state',
      () => {
        const action = {};

        const newState = userFavouritesReducer(undefined, action);
        expect(newState).toEqual({});
      }
    );
  });

  describe('CASE: GET_USER_FAVOURITE', () => {
    it('Should get all favourites when action is called', () => {
      const action = {
        type: ActionTypes.GET_USER_FAVOURITE,
        favourites: [
          {
            name: 'test',
            ingredients: 'test, test, test',
            description: 'mix it'
          },
          {
            name: 'test2',
            ingredients: 'test, test, test',
            description: 'mix it'
          }
        ]
      };

      const newState = userFavouritesReducer({}, action);
      expect(newState.favourites).toEqual(action.favourites);
    });
  });


  describe('CASE: GET_USER_FAVOURITE_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_USER_FAVOURITE_ERROR,
        message: 'internal server error'
      };

      const newState = userFavouritesReducer({}, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });
});

