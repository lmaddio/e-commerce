/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import NavLink from 'App/components/NavLink/NavLink';

jest.mock('App/components/NavLink', () => 'NavLink');

describe('NavLink component', () => {
  it('Render', () => {
    const title = 'link';
    const wrapper = shallow(
      <NavLink title={title} />,
    );
    expect(wrapper.find(NavItem)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
