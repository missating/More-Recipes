import React from 'react';
import toJSON from 'enzyme-to-json';
import { Home } from '../../../components/main/Home';

describe('Home component', () => {
  const props = {
    authenticated: false
  };

  it('Should render', () => {
    const wrapper = shallow(<Home
      {...props}
    />);
    expect(wrapper.find('div').length).toEqual(8);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

