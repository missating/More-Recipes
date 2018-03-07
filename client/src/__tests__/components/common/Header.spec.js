import React from 'react';
import toJSON from 'enzyme-to-json';
import { Header } from '../../../components/common/Header';

describe('Header component', () => {
  const props = {
    authenticated: true,
    user: {
      fullname: 'test'
    },
    signUserOut: jest.fn(() => Promise.resolve())
  };

  it('Should render', () => {
    const wrapper = shallow(<Header
      {...props}
    />);
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(2);
    expect(wrapper.find('li').length).toEqual(3);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('Should sign user out when button is clicked', () => {
    const wrapper = shallow(<Header
      {...props}
    />);
    wrapper.find('#signout').simulate('click');
  });
});

