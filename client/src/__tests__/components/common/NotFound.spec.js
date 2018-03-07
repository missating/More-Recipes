import React from 'react';
import toJSON from 'enzyme-to-json';
import NotFound from '../../../components/common/NotFound';

describe('Not found component', () => {
  it('Should render', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

