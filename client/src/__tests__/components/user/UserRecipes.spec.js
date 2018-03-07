import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { UserRecipes } from '../../../components/user/UserRecipes';
import { ConnectedUserRecipeCard }
  from '../../../components/cards/UserRecipeCard';

describe('User recipes component', () => {
  const props = {
    recipes: jest.fn(() => Promise.resolve()),
    authenticated: true,
    pagination: {
      pages: 1
    },
    history: {
      push: jest.fn()
    }
  };

  it('Should render', () => {
    const wrapper = shallow(<UserRecipes
      {...props}
    />);
    expect(wrapper.find(ConnectedUserRecipeCard).exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it('Should not render recipes if all recipes is an empty array', () => {
    const wrapper = shallow(<UserRecipes
      userRecipes={[]}
      pagination={{ pages: 1 }}
      {...props}
    />);
    expect(wrapper.find(ConnectedUserRecipeCard).length).toEqual(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it('Should render 2 recipes if userRecipes contains 2 objects', () => {
    const userRecipes = [
      {
        recipeImage: 'image_url',
        name: 'test',
        description: 'test, test',
        id: 1
      },
      {
        recipeImage: 'image_url',
        name: 'test2',
        description: 'test, test',
        id: 2
      }

    ];
    const wrapper = shallow(<UserRecipes
      userRecipes={userRecipes}
      {...props}
    />);
    wrapper.instance().setState({
      loading: false,
      userRecipes
    });
    wrapper.update();
    expect(wrapper.find(ConnectedUserRecipeCard).length).toEqual(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it('should set on page change ', () => {
    const spy = sinon.spy();

    const selected = {
      current: 1
    };
    const wrapper = shallow(<UserRecipes
      recipes={spy}
      userRecipes={[]}
      pagination={{ pages: 3 }}
      {...props}
    />);
    wrapper.instance().onPageChange(selected);
  });


  it('Should be called when component is passed in new props', () => {
    const newRecipes =
      [{
        recipeImage: 'image_url',
        name: 'test',
        description: 'test, test',
        id: 1
      }];
    const wrapper = shallow(<UserRecipes
      userRecipes={[]}
      {...props}
    />);
    wrapper.instance().componentWillReceiveProps({
      userRecipes:
        newRecipes
    });
    wrapper.update();
    expect(wrapper.instance().state.userRecipes).toEqual(newRecipes);
  });
});

