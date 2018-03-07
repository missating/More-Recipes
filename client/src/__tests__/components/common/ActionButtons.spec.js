import React from 'react';
import toJSON from 'enzyme-to-json';
import ActionButtons from '../../../components/common/ActionButtons';

describe('Action Buttons component', () => {
  const props = {
    singleRecipe: {
      favourite: 1,
      upvote: 1,
      downvote: 1
    }
  };

  it('Should render', () => {
    const wrapper = shallow(<ActionButtons
      {...props}
    />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

