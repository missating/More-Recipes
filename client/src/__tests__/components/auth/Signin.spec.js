import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { Signin } from '../../../components/auth/Signin';

describe('Sign in component', () => {
  const props = {
    signinUser: jest.fn(() => Promise.resolve()),
    auth: {
      isAuthenticated: true,
      user: {
        fullname: 'test',
        username: 'test',
        email: 'test@test.com',
        id: 1
      },
      errorMessage: ''
    }
  };

  it('Should render', () => {
    const wrapper = shallow(<Signin
      {...props}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it(
    'calls onChange method when the value of the user input changes',
    () => {
      const spy = sinon.spy(Signin.prototype, 'onChange');
      const wrapper = shallow(<Signin
        {...props}
      />);
      wrapper.find('#signinPassword').simulate('change', {
        target: { name: 'password', value: '123456' }
      });
      expect(spy.called).toBeTruthy();
    }
  );


  it('Should submit form when submit button is clicked', () => {
    const spy = sinon.spy(Signin.prototype, 'onSubmit');
    const wrapper = shallow(<Signin
      {...props}
    />);
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(spy.called).toBeTruthy();
  });


  it('Should add user when form submitt with all user details', () => {
    const wrapper = shallow(<Signin
      {...props}
    />);
    wrapper.instance().setState({
      email: 'test@test.com',
      password: '123456',
      errors: {}
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state).toEqual({
      email: 'test@test.com',
      password: '123456',
      errors: {}
    });
  });


  it('Should be called when component is passed in new props', () => {
    const wrapper = shallow(<Signin
      {...props}
    />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().props.auth.isAuthenticated)
      .toEqual(props.auth.isAuthenticated);
  });
});
