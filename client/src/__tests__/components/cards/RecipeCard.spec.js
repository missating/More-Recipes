import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import RecipeCard from '../../../components/cards/RecipeCard';

describe('Recipe card component', () => {
  const props = {
    id: 1,
    name: 'test',
    description: 'add all',
    recipeImage: 'image_url',
  };


  it('Should render', () => {
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(wrapper.find('div').length).toEqual(4);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should remove favourite when button is clicked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<RecipeCard
      {...props}
      onButtonClick={spy}
      button
    />);
    wrapper.find('#removeButton').simulate('click');
    expect(spy.called).toBeTruthy();
  });
});

