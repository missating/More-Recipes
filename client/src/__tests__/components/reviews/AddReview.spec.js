import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { AddReview } from '../../../components/reviews/AddReview';

describe('Add review component', () => {
  const props = {
    recipeId: 1,
    addNewReview: jest.fn(() => Promise.resolve())
  };

  it('Should render', () => {
    const wrapper = shallow(<AddReview
      {...props}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'calls onChange method when the value of the new review input changes',
    () => {
      const spy = sinon.spy(AddReview.prototype, 'onChange');
      const wrapper = shallow(<AddReview
        {...props}
      />);
      wrapper.find('#reviewContent').simulate('change', {
        target: { name: 'content', value: 'good stuff' }
      });
      expect(spy.called).toBeTruthy();
    }
  );

  it('Should submit form when submit button is clicked', () => {
    const spy = sinon.spy(AddReview.prototype, 'onSubmit');
    const wrapper = shallow(<AddReview
      {...props}
    />);
    wrapper.instance().setState({
      content: 'good stuff',
      errors: {}
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(spy.called).toBeTruthy();
    wrapper.instance().setState({
      content: '',
      errors: {}
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.errors)
      .toEqual({ content: 'Please add a review' });
  });
});

