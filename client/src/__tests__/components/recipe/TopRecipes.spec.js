import React from 'react';
import toJSON from 'enzyme-to-json';
import { TopRecipes } from '../../../components/recipe//TopRecipes';
import RecipeCard from '../../../components/cards/RecipeCard';

describe('Top recipe component', () => {
  const getTopRecipes = jest.fn(() => Promise.resolve());

  it('Should render', () => {
    const wrapper = shallow(<TopRecipes
      recipes={getTopRecipes}
      topRecipes={[]}
    />);
    expect(wrapper.find(RecipeCard).exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should not render recipes if topRecipes is an empty array', () => {
    const wrapper = shallow(<TopRecipes
      recipes={getTopRecipes}
      topRecipes={[]}
    />);
    expect(wrapper.find(RecipeCard).length).toEqual(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should render 2 recipes if topRecipes contains 2 objects', () => {
    const topRecipes = [
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
    const wrapper = shallow(<TopRecipes
      recipes={getTopRecipes}
      topRecipes={topRecipes}
    />);
    expect(wrapper.find(RecipeCard).length).toEqual(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

