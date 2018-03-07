import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { Profile } from '../../../components/user/Profile';

describe('Profile component', () => {
  const props = {
    userProfile: {
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      joined: '3/4/17'
    },
    getUserDetails: jest.fn(() => Promise.resolve()),
    authenticated: true,
    updateProfile: jest.fn(() => Promise.resolve()),
    isFetching: false
  };

  it('Should render', () => {
    const wrapper = shallow(<Profile
      {...props}
    />);
    expect(wrapper.find('form').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it('Should render loader when fetching', () => {
    const props2 = {
      userProfile: {
        fullname: 'test',
        username: 'test',
        email: 'test@test.com',
        joined: '3/4/17'
      },
      getUserDetails: jest.fn(() => Promise.resolve()),
      authenticated: true,
      updateProfile: jest.fn(() => Promise.resolve()),
      isFetching: true
    };

    const wrapper = shallow(<Profile
      {...props2}
    />);
    expect(wrapper.find('div').length).toEqual(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });


  it(
    'calls onChange method when the value of the new recipe input changes',
    () => {
      const spy = sinon.spy(Profile.prototype, 'onChange');
      const wrapper = shallow(<Profile
        {...props}
      />);
      wrapper.find('#usernameField').simulate('change', {
        target: { name: 'username', value: 'testy' }
      });
      expect(spy.called).toBeTruthy();
    }
  );

  it('Should submit form when submit button is clicked', () => {
    const spy = sinon.spy(Profile.prototype, 'onSubmit');
    const wrapper = shallow(<Profile
      {...props}
    />);
    wrapper.find('#profileSubmit').simulate(
      'click',
      { preventDefault: jest.fn() }
    );
    expect(spy.called).toBeTruthy();
  });


  it('Should enable state when edit button is clicked', () => {
    const spy = sinon.spy(Profile.prototype, 'onEdit');
    const wrapper = shallow(<Profile
      {...props}
    />);
    wrapper.instance().setState({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      joined: '3/4/17',
      disabled: true
    });
    wrapper.update();
    wrapper.find('#profileEdit').simulate('click');
    expect(wrapper.instance().state).toEqual({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      joined: '3/4/17',
      disabled: false
    });
    expect(spy.called).toBeTruthy();
  });


  it('Should disable state when cancel button is clicked', () => {
    const spy = sinon.spy(Profile.prototype, 'cancelEdit');
    const wrapper = shallow(<Profile
      {...props}
    />);
    wrapper.instance().setState({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      joined: '3/4/17',
      disabled: false
    });
    wrapper.update();
    wrapper.find('#profileCancel').simulate('click');
    expect(wrapper.instance().state).toEqual({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      joined: '3/4/17',
      disabled: true
    });
    expect(spy.called).toBeTruthy();
  });


  it('Should be called when component is passed in new props', () => {
    const wrapper = shallow(<Profile
      {...props}
    />);
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().props.userProfile).toEqual(props.userProfile);
    wrapper.instance().setState({
      fullname: 'test',
      username: 'test',
      email: 'test@test.com',
      joined: '3/4/17',
    });
    wrapper.update();
  });
});

