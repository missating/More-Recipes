import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { SearchRecipe } from '../../../components/recipe/SearchRecipe';


describe('Search recipes component', () => {
  const searchRecipes = jest.fn(() => Promise.resolve());

  it('Should render', () => {
    const wrapper = shallow(<SearchRecipe
      searchRecipes={searchRecipes}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'calls onChange method when the value of the search input changes',
    () => {
      const spy = sinon.spy(SearchRecipe.prototype, 'onChange');
      const wrapper = shallow(<SearchRecipe
        searchRecipes={searchRecipes}
        pagination={{ curentPage: 1 }}
      />);
      wrapper.find('#search').simulate('change', {
        target: { name: 'searchQuery', value: 'Search Value' }
      });
      expect(spy.called).toBeTruthy();
    }
  );
});

