/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Badge } from 'reactstrap';
import BadgeCart from 'cart/BadgeCart/BadgeCart';

describe('BadgeCart component', () => {
  it('Should inCart props as label', () => {
    const wrapper = shallow(
      <BadgeCart inCart={6} />,
    );
    expect(wrapper.find(Badge)).toHaveLength(1);
    expect(wrapper.find(Badge).children().text()).toEqual('6');
  });
});
