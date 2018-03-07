import React from 'react';
import toJSON from 'enzyme-to-json';
import Footer from '../../../components/common/Footer';

describe('Footer component', () => {
  it('Should render', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div').length).toEqual(4);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

