/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import AppNavBar from 'App/components/NavBar/NavBar';

jest.mock('App/components/NavLink', () => 'NavLink');

describe('NavBar component', () => {
  it('Render', () => {
    const wrapper = shallow(
      <AppNavBar logout={() => {}} />,
    );
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(NavbarToggler)).toHaveLength(1);
    expect(wrapper.find(Collapse)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find('NavLink')).toHaveLength(2);
  });

  it('Toggle state', () => {
    const wrapper = shallow(
      <AppNavBar logout={() => {}} />,
    );
    const instance = wrapper.instance();
    expect(wrapper.state()).toEqual({ isOpen: false });
    instance.toggle();
    expect(wrapper.state()).toEqual({ isOpen: true });
  });
});
