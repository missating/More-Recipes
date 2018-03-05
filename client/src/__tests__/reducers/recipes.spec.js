import recipeReducer from '../../reducers/recipes';
import * as ActionTypes from '../../actions/actionTypes';

const initialState = {
  recipes: {
    allrecipes: [],
    singleRecipe: {
      id: 0,
      favourite: 0,
      Reviews: []
    }
  }
};

describe('Recipes reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should set recipes to their initial values and return the initial state',
      () => {
        const action = {};

        const expected = {
          recipes: {
            allrecipes: [],
            singleRecipe: {
              id: 0,
              favourite: 0,
              Reviews: []
            }
          }
        };

        const newState = recipeReducer(initialState, action);
        expect(newState).toEqual(expected);
      }
    );
  });

  describe('CASE: GET_ALL_RECIPES', () => {
    it('Should get all recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_ALL_RECIPES,
        recipes: {
          allrecipes: [
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
        }
      };

      const newState = recipeReducer(initialState.recipes, action);
      expect(newState.allrecipes).toEqual(action.recipes);
    });
  });


  describe('CASE: GET_ALL_RECIPES_ERROR', () => {
    it('Should get error message for recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_ALL_RECIPES_ERROR,
        message: 'internal server error'
      };

      const newState = recipeReducer(initialState.recipes, action);
      expect(newState.errorMessage).toEqual(action.message);
    });
  });

  describe('CASE: SEARCH_RECIPES', () => {
    it('Should search all recipes when action is called', () => {
      const action = {
        type: ActionTypes.SEARCH_RECIPES,
        recipes: {
          allrecipes: [
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
        }
      };

      const newState = recipeReducer(initialState.recipes, action);
      expect(newState.allrecipes).toEqual(action.recipes);
    });
  });


  describe('CASE: SEARCH_RECIPES_ERROR', () => {
    it(
      'Should get error message for search recipes when action is called',
      () => {
        const action = {
          type: ActionTypes.SEARCH_RECIPES_ERROR,
          message: 'internal server error'
        };

        const newState = recipeReducer(initialState.recipes, action);
        expect(newState.errorMessage).toEqual(action.message);
      }
    );
  });

  describe('CASE: GET_SINGLE_RECIPE', () => {
    it('Should search all recipes when action is called', () => {
      const action = {
        type: ActionTypes.GET_SINGLE_RECIPE,
        recipe: {
          singleRecipe: {
            id: 1,
            name: 'test2',
            ingredients: 'test, test, test',
            description: 'mix it'
          }
        }
      };

      const newState = recipeReducer(initialState.recipes, action);
      expect(newState.singleRecipe).toEqual(action.recipe);
    });
  });


  describe('CASE: GET_SINGLE_RECIPE_ERROR:', () => {
    it(
      'Should get error message for single recipe when action is called',
      () => {
        const action = {
          type: ActionTypes.GET_SINGLE_RECIPE_ERROR,
          message: 'internal server error'
        };

        const newState = recipeReducer(initialState.recipes, action);
        expect(newState.errorMessage).toEqual(action.message);
      }
    );
  });

  describe('CASE: ADD_REVIEW', () => {
    it('Should add review for a recipe when action is called', () => {
      const action = {
        type: ActionTypes.ADD_REVIEW,
        review: {
          content: 'good'
        }
      };

      const newState = recipeReducer(initialState.recipes, action);
      expect(newState.singleRecipe.Reviews).toEqual([action.review]);
    });
  });

  describe('CASE: ADD_REVIEW_ERROR:', () => {
    it(
      'Should get error message for single recipe when action is called',
      () => {
        const action = {
          type: ActionTypes.ADD_REVIEW_ERROR,
          message: 'internal server error'
        };

        const newState = recipeReducer(initialState.recipes, action);
        expect(newState.singleRecipe.errorMessage).toEqual(action.message);
      }
    );
  });

  describe('CASE: ADD_FAVOURITE', () => {
    it('Should add favourite for a recipe when action is called', () => {
      const action = {
        type: ActionTypes.ADD_FAVOURITE,
      };

      const newState = recipeReducer(initialState.recipes, action);
      expect(newState.singleRecipe.favourite).toEqual(1);
    });
  });

  describe('CASE: ADD_FAVOURITE_ERROR', () => {
    it(
      'Should get error message for add favourite recipe when action is called',
      () => {
        const action = {
          type: ActionTypes.ADD_FAVOURITE_ERROR,
          message: 'internal server error'
        };

        const newState = recipeReducer(initialState.recipes, action);
        expect(newState.singleRecipe.errorMessage).toEqual(action.message);
      }
    );
  });

  describe('CASE: REMOVE_FAVOURITE', () => {
    it('Should remove favourite for a recipe when action is called', () => {
      const action = {
        type: ActionTypes.REMOVE_FAVOURITE
      };

      const state = {
        recipes: {
          allrecipes: [],
          singleRecipe: {
            id: 0,
            favourite: 1,
            Reviews: []
          }
        }
      };

      const newState = recipeReducer(state.recipes, action);
      expect(newState.singleRecipe.favourite).toEqual(0);
    });
  });

  describe('CASE: REMOVE_FAVOURITE_ERROR', () => {
    it(
      'Should get error message for remove favourite when action is called',
      () => {
        const action = {
          type: ActionTypes.REMOVE_FAVOURITE_ERROR,
          message: 'internal server error'
        };

        const newState = recipeReducer(initialState.recipes, action);
        expect(newState.singleRecipe.errorMessage).toEqual(action.message);
      }
    );
  });

  describe('CASE: ADD_RECIPE', () => {
    it('Should add new recipe when action is called', () => {
      const action = {
        type: ActionTypes.ADD_RECIPE,
        newRecipe: {
          name: 'test',
          ingredients: 'test, test, test',
          description: 'add all together'
        }
      };

      const newState = recipeReducer(undefined, action);
      expect(newState.newRecipe).toEqual(action.newRecipe);
    });
  });

  describe('CASE: ADD_RECIPE_ERROR', () => {
    it(
      'Should get error message for add new recipe when action is called',
      () => {
        const action = {
          type: ActionTypes.ADD_RECIPE_ERROR,
          message: 'internal server error'
        };

        const newState = recipeReducer(undefined, action);
        expect(newState.errorMessage).toEqual(action.message);
      }
    );
  });
});
