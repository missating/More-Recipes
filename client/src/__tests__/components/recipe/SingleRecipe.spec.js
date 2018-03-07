import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { SingleRecipe } from '../../../components/recipe/SingleRecipe';
import ActionButtons from '../../../components/common/ActionButtons';
import ViewReviews from '../../../components//reviews/ViewReviews';


describe('Single recipe component', () => {
  const props = {
    singleRecipe: {
      id: 1,
      recipeImage: 'image_url',
      name: 'test',
      ingredients: 'test, test',
      description: 'mix it',
      favourite: 0,
      upvote: 0,
      downvote: 0
    },
    recipe: jest.fn(() => Promise.resolve()),
    upvote: jest.fn(() => Promise.resolve()),
    favourite: jest.fn(() => Promise.resolve()),
    match: {
      params: {
        id: '1'
      }
    },
    authenticated: true
  };

  it('Should render', () => {
    const wrapper = shallow(<SingleRecipe
      {...props}
    />);
    expect(wrapper.find(ViewReviews).exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should favourite recipe when button is clicked', () => {
    const spy = sinon.spy(SingleRecipe.prototype, 'onFavourite');
    const wrapper = shallow(<SingleRecipe
      {...props}
    />);
    wrapper.find('#onFavourite').simulate('click');
    expect(spy.called).toBeTruthy();
  });

  it('Should upvote recipe when button is clicked', () => {
    const spy = sinon.spy(SingleRecipe.prototype, 'onUpvote');
    const wrapper = shallow(<SingleRecipe
      {...props}
    />);
    wrapper.find('#onUpvote').simulate('click');
    expect(spy.called).toBeTruthy();
  });

  it('Should downvote recipe when button is clicked', () => {
    const spy = sinon.spy(SingleRecipe.prototype, 'onDownVote');
    const wrapper = shallow(<SingleRecipe
      {...props}
    />);
    wrapper.find('#onDownvote').simulate('click');
    expect(spy.called).toBeTruthy();
  });

  it('Should be called when component is passed in new props', () => {
    const wrapper = shallow(<SingleRecipe
      {...props}
    />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.singleRecipe).toEqual(props.singleRecipe);
    wrapper.instance().setState({
      reviews: [
        {
          User: {
            fullname: 'test',
            email: 'test@test.com'
          },
          content: 'good stuff',
          created: '2/3/17'
        }
      ]
    });
    wrapper.update();
    expect(wrapper.find(ViewReviews).length).toEqual(1);
  });

  it('Should render action buttons when auth is false', () => {
    const props2 = {
      singleRecipe: {
        id: 1,
        recipeImage: 'image_url',
        name: 'test',
        ingredients: 'test, test',
        description: 'mix it',
        favourite: 0,
        upvote: 0,
        downvote: 0
      },
      recipe: jest.fn(() => Promise.resolve()),
      upvote: jest.fn(() => Promise.resolve()),
      favourite: jest.fn(() => Promise.resolve()),
      match: {
        params: {
          id: '1'
        }
      },
      authenticated: false
    };
    const wrapper = shallow(<SingleRecipe
      {...props2}
    />);
    expect(wrapper.find(ActionButtons).exists()).toBeTruthy();
  });
});

