/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Row, Col, Nav, Container,
} from 'reactstrap';
import Cart from 'App/scenes/Cart/Cart';

jest.mock('cart/CartTable/CartTable', () => 'CartTable');
jest.mock('App/components/NavBar/NavBar', () => 'NavBar');
jest.mock('App/components/NavLink/NavLink', () => 'NavLink');

describe('Cart component', () => {
  it('Render', () => {
    const wrapper = shallow(
      <Cart />,
    );
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find('NavLink')).toHaveLength(1);
    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Row)).toHaveLength(1);
    expect(wrapper.find(Col)).toHaveLength(1);
  });
});
