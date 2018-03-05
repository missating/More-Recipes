import paginationReducer from '../../reducers/pagination';
import * as ActionTypes from '../../actions/actionTypes';


describe('Pagination reducer', () => {
  describe('DEFAULT', () => {
    it(
      'Should show pagination values and return the initial state',
      () => {
        const action = {};

        const newState = paginationReducer(undefined, action);
        expect(newState).toEqual({});
      }
    );
  });

  describe('CASE: SHOW_PAGINATION', () => {
    it('Should show pagination when action is called', () => {
      const action = {
        type: ActionTypes.SHOW_PAGINATION,
        details: {
          currentPage: 1,
          limit: 6,
          pages: 0,
          numberOfItems: 0
        }
      };

      const newState = paginationReducer({}, action);
      expect(newState.currentPage).toEqual(action.details.currentPage);
      expect(newState.limit).toEqual(action.details.limit);
      expect(newState.pages).toEqual(action.details.pages);
      expect(newState.numberOfItems).toEqual(action.details.numberOfItems);
    });
  });
});

