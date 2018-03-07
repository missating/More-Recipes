import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import moxios from 'moxios';
import { AddRecipe } from '../../../components/recipe/AddRecipe';

describe('Add Recipe component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  const props = {
    authenticated: true,
    history: {
      push: jest.fn()
    }
  };

  const addRecipe = jest.fn(() => Promise.resolve());

  it('Should render', () => {
    const wrapper = shallow(<AddRecipe
      addNewRecipe={addRecipe}
      {...props}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'calls onChange method when the value of the new recipe input changes',
    () => {
      const spy = sinon.spy(AddRecipe.prototype, 'onChange');
      const wrapper = shallow(<AddRecipe
        addNewRecipe={addRecipe}
        {...props}
      />);
      wrapper.find('#recipeDescription').simulate('change', {
        target: { name: 'description', value: 'recipe description' }
      });
      expect(spy.called).toBeTruthy();
    }
  );

  it('Should submit form when submit button is clicked', () => {
    const spy = sinon.spy(AddRecipe.prototype, 'onSubmit');
    const wrapper = shallow(<AddRecipe
      addNewRecipe={addRecipe}
      {...props}
    />);
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(spy.called).toBeTruthy();
  });

  it('Should add recipe when form is submitted with image', () => {
    moxios.stubRequest(
      'https://api.cloudinary.com/v1_1/dxayftnxb/image/upload',
      {
        status: 200,
        response: {
          imageUrl: 'image_url'
        }
      }
    );
    const wrapper = shallow(<AddRecipe
      addNewRecipe={addRecipe}
      {...props}
    />);
    wrapper.instance().setState({
      newRecipe: {
        name: 'Test',
        ingredients: 'test, test',
        description: 'This is just a test recipe',
        recipeImage: {
          preview: 'preview_url'
        },
        submitting: false
      },
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.newRecipe).toEqual({
      name: 'Test',
      ingredients: 'test, test',
      description: 'This is just a test recipe',
      recipeImage: {
        preview: 'preview_url'
      },
      submitting: false
    });
  });

  it('Should add recipe when form is submitted without image', () => {
    const props2 = {
      authenticated: false,
      history: {
        push: jest.fn()
      }
    };
    const wrapper = shallow(<AddRecipe
      addNewRecipe={addRecipe}
      {...props2}
    />);
    wrapper.instance().setState({
      newRecipe: {
        name: 'Test',
        ingredients: 'test, test',
        description: 'This is just a test recipe',
        recipeImage: '',
        submitting: false
      },
    });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.newRecipe).toEqual({
      name: 'Test',
      ingredients: 'test, test',
      description: 'This is just a test recipe',
      recipeImage: '',
      submitting: false
    });
  });

  it('should set uploaded files to state', () => {
    const files = [
      {
        name: 'file 1',
        url: 'url'
      }
    ];
    const wrapper = shallow(<AddRecipe
      addNewRecipe={addRecipe}
      {...props}
    />);
    wrapper.instance().handleDrop(files);
    expect(wrapper.instance().state.newRecipe).toEqual({
      recipeImage:
        { name: 'file 1', url: 'url' }
    });
  });
});

