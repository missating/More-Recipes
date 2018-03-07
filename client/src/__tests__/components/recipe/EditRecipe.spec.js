import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import moxios from 'moxios';
import { EditRecipe } from '../../../components/recipe/EditRecipe';

describe('Edit Recipe component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    authenticated: true,
    match: {
      params: {
        id: '1'
      }
    },
    history: {
      push: jest.fn()
    },
    singleRecipe: {
      id: 1,
      name: 'test',
      ingredients: 'test, test',
      description: 'mix it',
      favourite: 0,
      upvote: 0,
      downvote: 0,
      Reviews: []
    },
    getRecipeDetails: jest.fn(() => Promise.resolve()),
    updateRecipe: jest.fn(() => Promise.resolve())
  };


  it('Should render', () => {
    const wrapper = shallow(<EditRecipe
      {...props}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'calls onChange method when the value of the edit recipe input changes',
    () => {
      const spy = sinon.spy(EditRecipe.prototype, 'onChange');
      const wrapper = shallow(<EditRecipe
        {...props}
      />);
      wrapper.find('#updateDescription').simulate('change', {
        target: { name: 'description', value: 'recipe description' }
      });
      expect(spy.called).toBeTruthy();
    }
  );

  it('Should update recipe when submit button is clicked', () => {
    const spy = sinon.spy(EditRecipe.prototype, 'onEdit');
    const wrapper = shallow(<EditRecipe
      {...props}
    />);
    wrapper.find('#editButton').simulate(
      'click',
      { preventDefault: jest.fn() }
    );
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
    const wrapper = shallow(<EditRecipe
      {...props}
    />);
    wrapper.instance().setState({
      name: 'Test',
      ingredients: 'test, test',
      description: 'This is just a test recipe',
      recipeImage: {
        preview: 'preview_url'
      },
      newImage: {
        preview: 'preview_url'
      },
      submitting: false
    });
    wrapper.update();
    wrapper.find('#editButton').simulate(
      'click',
      { preventDefault: jest.fn() }
    );
    expect(wrapper.instance().state).toEqual({
      description: 'This is just a test recipe',
      errors: {},
      ingredients: 'test, test',
      name: 'Test',
      newImage: {
        preview: 'preview_url'
      },
      recipeImage: { preview: 'preview_url' },
      submitting: false,
      updating: true
    });
  });

  it('should set uploaded files to state', () => {
    const files = [
      {
        name: 'file 1',
        url: 'url'
      }
    ];
    const wrapper = shallow(<EditRecipe
      {...props}
    />);
    wrapper.instance().handleDrop(files);
    expect(wrapper.instance().state.newImage).toEqual({
      name: 'file 1', url: 'url'
    });
  });
});

