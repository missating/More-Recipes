import userRecipesReducer from '../../reducers/userRecipes';
import * as ActionTypes from '../../actions/actionTypes';

describe('User recipes reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should set recipes to their initial values and return the initial state',
      () => {
        const action = {};

        const newState = userRecipesReducer(undefined, action);
        expect(newState).toEqual({});
      }
    );
  });


  describe('CASE: GET_USER_RECIPES', () => {
    it('Should get all recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_USER_RECIPES,
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

      const newState = userRecipesReducer({}, action);
      expect(newState.recipes).toEqual(action.recipes);
    });
  });

  describe('CASE: GET_USER_RECIPES_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_USER_RECIPES_ERROR,
        message: 'internal server error'
      };

      const newState = userRecipesReducer({}, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });


  describe('CASE: EDIT_RECIPE', () => {
    it('Should get edit recipe when action is called', () => {
      const action = {
        type: ActionTypes.EDIT_RECIPE,
        recipe: {
          name: 'test',
          ingredients: 'test, test, test',
          description: 'mix it'
        }
      };

      const newState = userRecipesReducer({}, action);
      expect(newState.recipe).toEqual(action.recipe);
    });
  });

  describe('CASE: EDIT_RECIPE_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.EDIT_RECIPE_ERROR,
        message: 'internal server error'
      };

      const newState = userRecipesReducer({}, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });

  describe('CASE: DELETE_RECIPE', () => {
    it('Should delete recipes when action is called', () => {
      const action = {
        type: ActionTypes.DELETE_RECIPE,
        recipeId: 1
      };

      const recipes = [
        {
          id: 1,
          name: 'test',
          ingredients: 'test, test, test',
          description: 'mix it'
        },
        {
          id: 2,
          name: 'test 2',
          ingredients: 'test, test, test',
          description: 'mix it'
        }
      ];

      const newState = userRecipesReducer({ recipes }, action);
      expect(newState.recipes.length).toEqual(1);
      expect(newState.recipes[0].name).toEqual('test 2');
    });
  });


  describe('CASE: DELETE_RECIPE_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.DELETE_RECIPE_ERROR,
        message: 'internal server error'
      };

      const newState = userRecipesReducer({}, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });
});

