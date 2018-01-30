import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../../components/Footer';

describe('The Footer component', () => {
  it('Should mount the Footer component without errors', () => {
    const tree = renderer.create(<Footer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
