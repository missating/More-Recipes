import React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('The Header component', () => {
  it('Should mount the Header component without errors', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false
      }
    });
    const tree = shallow((
      <Header store={store} />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('Should render profile link when user is authenticated', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true
      }
    });
    const tree = renderer.create((
      <MemoryRouter>
        <Header store={store} />
      </MemoryRouter>
    ));
    const linkToProfile = tree.root.findAllByProps({ to: '/profile' });

    expect(linkToProfile.length).toBe(1);

    expect(tree).toMatchSnapshot();
  });
});

