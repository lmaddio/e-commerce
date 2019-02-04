/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import Menu from 'categories/Menu/Menu';

jest.mock('categories/Menu/SubMenu', () => 'SubMenu');

describe('Menu component', () => {
  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(
      <Menu
        categories={[]}
        InputComponent={() => null}
      />,
    );
    instance = wrapper.instance();
  });

  it('Should render basic components', () => {
    expect(wrapper.find(Dropdown)).toHaveLength(1);
    expect(wrapper.find(DropdownToggle)).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find(DropdownMenu)).toHaveLength(1);
    expect(wrapper.find('SubMenu')).toHaveLength(1);
  });

  describe('methods', () => {
    it('showDropdown should trigger state', () => {
      expect(wrapper.state()).toEqual({ dropdownOpen: false });

      instance.showDropdown(true)();
      expect(wrapper.state()).toEqual({ dropdownOpen: true });

      instance.showDropdown(false)();
      expect(wrapper.state()).toEqual({ dropdownOpen: false });
    });

    it('toggle should trigger state', () => {
      expect(wrapper.state()).toEqual({ dropdownOpen: false });

      instance.toggle({ preventDefault: () => {} });
      expect(wrapper.state()).toEqual({ dropdownOpen: true });

      instance.toggle({ preventDefault: () => {} });
      expect(wrapper.state()).toEqual({ dropdownOpen: false });
    });
  });
});
