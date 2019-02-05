/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Jumbotron, Button } from 'reactstrap';
import FunnyMessage from 'App/components/FunnyMessage/FunnyMessage';

describe('FunnyMessage component', () => {
  it('Render', () => {
    const wrapper = shallow(
      <FunnyMessage />,
    );
    expect(wrapper.find(Jumbotron)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
