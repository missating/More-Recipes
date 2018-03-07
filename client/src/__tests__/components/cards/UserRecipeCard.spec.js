import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { UserRecipeCard } from '../../../components/cards/UserRecipeCard';

jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn()
}));

describe('User recipe card component', () => {
  const props = {
    id: 1,
    name: 'test',
    description: 'mix it',
    recipeImage: 'image_url'
  };

  const deleteRecipe = jest.fn(() => Promise.resolve());

  it('Should render', () => {
    const wrapper = shallow(<UserRecipeCard
      {...props}
      deleteRecipe={deleteRecipe}
    />);
    expect(wrapper.find('div').length).toEqual(4);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should delete recipe when button is clicked', () => {
    const spy = sinon.spy(UserRecipeCard.prototype, 'onDeleteRecipe');
    const wrapper = shallow(<UserRecipeCard
      {...props}
      deleteRecipe={deleteRecipe}
    />);
    wrapper.find('#deleteButton').simulate('click');
    expect(spy.called).toBeTruthy();
  });
});

