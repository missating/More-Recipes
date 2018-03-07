import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { Recipes } from '../../../components/recipe/Recipes';
import RecipeCard from '../../../components/cards/RecipeCard';

describe('Recipe component', () => {
  const props = {
    history: {
      push: jest.fn()
    }
  };
  const getAllRecipes = jest.fn(() => Promise.resolve());

  it('Should render', () => {
    const wrapper = shallow(<Recipes
      recipes={getAllRecipes}
      allRecipes={[]}
      pagination={{ pages: 1 }}
      {...props}
    />);
    expect(wrapper.find(RecipeCard).exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should not render recipes if allRecipes is an empty array', () => {
    const wrapper = shallow(<Recipes
      recipes={getAllRecipes}
      allRecipes={[]}
      pagination={{ pages: 1 }}
      {...props}
    />);
    expect(wrapper.find(RecipeCard).length).toEqual(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should render 2 recipes if allRecipes contains 2 objects', () => {
    const allRecipes = [
      {
        id: 1,
        recipeImage: 'image_url',
        name: 'Eba',
        ingredients: 'Garri, Fire',
        description: 'Hello, this is my favorite food'
      },
      {
        id: 2,
        recipeImage: 'image_url',
        name: 'Eba',
        ingredients: 'Garri, Fire',
        description: 'Hello, this is my favorite food'
      }
    ];
    const wrapper = shallow(<Recipes
      recipes={getAllRecipes}
      allRecipes={allRecipes}
      pagination={{ pages: 1 }}
      {...props}
    />);
    expect(wrapper.find(RecipeCard).length).toEqual(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should set on page change ', () => {
    const spy = sinon.spy();

    const selected = {
      current: 1
    };
    const wrapper = shallow(<Recipes
      recipes={spy}
      allRecipes={[]}
      pagination={{ pages: 3 }}
      {...props}
    />);
    wrapper.instance().onPageChange(selected);
    expect(spy.called).toBeTruthy();
  });
});
