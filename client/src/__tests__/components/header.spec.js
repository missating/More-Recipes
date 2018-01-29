import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Header from '../../components/Header';

const mockStore = configureStore([]);

describe('The Header component', () => {
  it('Should mount the Header component without errors', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false
      }
    });
    const tree = shallow(<Header store={store} />);

    expect(tree).toMatchSnapshot();
  });

  it('Should render profile link when user is authenticated', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true
      }
    });
    const tree = renderer.create(<MemoryRouter>
        <Header store={store} />
      </MemoryRouter>);
    const linkToProfile = tree.root.findAllByProps({ to: '/profile' });

    expect(linkToProfile.length).toBe(1);

    expect(tree).toMatchSnapshot();
  });
});
