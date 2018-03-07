import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { Signup } from '../../../components/auth/Signup';

describe('Sign up component', () => {
  const props = {
    signupUser: jest.fn(() => Promise.resolve()),
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
    const wrapper = shallow(<Signup
      {...props}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it(
    'calls onChange method when the value of the new user input changes',
    () => {
      const spy = sinon.spy(Signup.prototype, 'onChange');
      const wrapper = shallow(<Signup
        {...props}
      />);
      wrapper.find('#signupPassword').simulate('change', {
        target: { name: 'confirmPassword', value: '123456' }
      });
      expect(spy.called).toBeTruthy();
    }
  );


  it('Should submit form when submit button is clicked', () => {
    const spy = sinon.spy(Signup.prototype, 'onSubmit');
    const wrapper = shallow(<Signup
      {...props}
    />);
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(spy.called).toBeTruthy();
  });


  it('Should add user when form submit with all user details', () => {
    const wrapper = shallow(<Signup
      {...props}
    />);
    wrapper.instance().setState({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
      errors: {}
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state).toEqual({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
      errors: {}
    });
  });


  it('Should be called when component is passed in new props', () => {
    const wrapper = shallow(<Signup
      {...props}
    />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().props.auth.isAuthenticated)
      .toEqual(props.auth.isAuthenticated);
  });
});

