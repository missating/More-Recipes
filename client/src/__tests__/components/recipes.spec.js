import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Recipes } from '../../components/Recipes';
import RecipeGallery from '../../components/RecipeGallery';

describe('Recip component', () => {
  const fetchAllRecipes = jest.fn(() => Promise.resolve());

  it('Should render', () => {
    const wrapper = mount(<Recipes fetchAllRecipes={fetchAllRecipes} allRecipes={[]} />);
    expect(wrapper.find(RecipeGallery).exists).toBeTruthy();
    expect(wrapper.find('#recipe-container').exists).toBeTruthy();
  });

  it('Should not render recipes if allRecipes is an empty array', () => {
    const wrapper = mount(<Recipes fetchAllRecipes={fetchAllRecipes} allRecipes={[]} />);
    expect(wrapper.find(RecipeGallery).length).toEqual(0);
  });

  it('Should not render recipes if allRecipes is an empty array', () => {
    const wrapper = mount(<Recipes fetchAllRecipes={fetchAllRecipes} allRecipes={[]} />);
    expect(wrapper.find(RecipeGallery).length).toEqual(0);
  });

  it('Should render 2 recipes if allRecipes contains 2 objects', () => {
    const allRecipes = [
      {
        id: 1,
        name: 'Eba',
        ingredients: 'Garri, Fire',
        description: 'Hello, this is my favorite food'
      },
      {
        id: 2,
        name: 'Eba',
        ingredients: 'Garri, Fire',
        description: 'Hello, this is my favorite food'
      }
    ];
    const wrapper = mount(<MemoryRouter>
      <Recipes fetchAllRecipes={fetchAllRecipes} allRecipes={allRecipes} />
    </MemoryRouter>);
    expect(wrapper.find(RecipeGallery).length).toEqual(2);
  });
});
