import React from 'react';
import toJSON from 'enzyme-to-json';
import { Main } from '../../../components/main/Main';

describe('Main component', () => {
  it('should render', () => {
    const wrapper = shallow(<Main />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

