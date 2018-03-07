import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { UserFavourites } from '../../../components/user/UserFavourites';
import RecipeCard from '../../../components/cards/RecipeCard';

jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn()
}));

describe('UserFavourites component', () => {
  const props = {
    favourites: jest.fn(() => Promise.resolve()),
    authenticated: true,
    pagination: {
      pages: 1
    },
    removeFavourite: jest.fn(() => Promise.resolve()),
    history: {
      push: jest.fn()
    }
  };

  it('Should render', () => {
    const wrapper = shallow(<UserFavourites
      {...props}
    />);
    expect(wrapper.find(RecipeCard).exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should not render recipes if all favourites is an empty array', () => {
    const wrapper = shallow(<UserFavourites
      userFavourites={[]}
      pagination={{ pages: 1 }}
      {...props}
    />);
    expect(wrapper.find(RecipeCard).length).toEqual(0);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it('Should render 1 recipes if userFavourites contains 2 objects', () => {
    const userFavourites = [
      {
        recipeId: 1,
        Recipe: {
          recipeImage: 'image_url',
          name: 'test',
          description: 'test, test',
          id: 1
        }
      }
    ];
    const wrapper = shallow(<UserFavourites
      userFavourites={userFavourites}
      {...props}
    />);
    wrapper.instance().setState({
      loading: false,
      userFavourites
    });
    wrapper.update();
    expect(wrapper.find(RecipeCard).length).toEqual(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it('should set on page change ', () => {
    const spy = sinon.spy();

    const current = {
      selected: 1
    };
    const wrapper = shallow(<UserFavourites
      favourites={spy}
      userFavourites={[]}
      pagination={{ pages: 3 }}
      {...props}
    />);
    wrapper.instance().onPageChange(current);
  });


  it('Should be called when component is passed in new props', () => {
    const newFavourites = [
      {
        recipeId: 1,
        Recipe: {
          recipeImage: 'image_url',
          name: 'test',
          description: 'test, test',
          id: 1
        }
      }
    ];
    const wrapper = shallow(<UserFavourites
      {...props}
    />);
    wrapper.instance().componentWillReceiveProps({
      userFavourites:
        newFavourites
    });
    wrapper.update();
    expect(wrapper.instance().state.userFavourites).toEqual(newFavourites);
  });
});
