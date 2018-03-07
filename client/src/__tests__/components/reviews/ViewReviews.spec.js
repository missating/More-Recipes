import React from 'react';
import toJSON from 'enzyme-to-json';
import ViewReviews from '../../../components/reviews/ViewReviews';

describe('view Reviews component', () => {
  const props = {
    content: 'good stuff',
    user: 'test',
    email: 'test@test.com'
  };

  it('Should render', () => {
    const wrapper = shallow(<ViewReviews
      {...props}
    />);
    expect(wrapper.find('div').length).toEqual(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

