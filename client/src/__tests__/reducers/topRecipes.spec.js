import topRecipeReducer from '../../reducers/topRecipe';
import * as ActionTypes from '../../actions/actionTypes';

describe('Top recipes reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should set recipes to their initial values and return the initial state',
      () => {
        const action = {};

        const newState = topRecipeReducer(undefined, action);
        expect(newState).toEqual({});
      }
    );
  });

  describe('CASE: GET_TOP_RECIPES', () => {
    it('Should get top recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_TOP_RECIPES,
        recipes: [
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

      const newState = topRecipeReducer({}, action);
      expect(newState.recipes).toEqual(action.recipes);
    });


    describe('CASE: GET_TOP_RECIPES_ERROR', () => {
      it('Should get error message for recipes when action is called', () => {
        const action = {
          type: ActionTypes.GET_TOP_RECIPES_ERROR,
          message: 'internal server error'
        };

        const newState = topRecipeReducer({}, action);
        expect(newState.errorMessage).toEqual(action.message);
      });
    });
  });
});

