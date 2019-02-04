/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import {
  Button,
  Collapse,
} from 'reactstrap';
import CollapsibleMenu from 'categories/Menu/CollapsibleMenu/CollapsibleMenu';

jest.mock('categories/Menu/CollapsibleMenu/CollapsibleMenu.module.css', () => ({
  arrow: 'arrow',
  divider: 'divider',
}));

const props = {
  name: 'categoryName',
  id: 3,
  isLastChild: false,
  isLastSubLevel: true,
};

describe('CollapsibleMenu component', () => {
  it('Should render the button and the Collapse with isOpen false', () => {
    const wrapper = mount(
      <CollapsibleMenu {...props}>
        <p>Children</p>
      </CollapsibleMenu>,
    );
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Collapse)).toHaveLength(1);
    expect(wrapper.find('.divider')).toHaveLength(1);
    expect(wrapper.state()).toEqual({ dropdownOpen: false });
  });

  it('Should render or not the divider', () => {
    const wrapper = mount(
      <CollapsibleMenu {...props} isLastChild>
        <p>Children</p>
      </CollapsibleMenu>,
    );
    expect(wrapper.state()).toEqual({ dropdownOpen: false });
    expect(wrapper.find('.divider')).toHaveLength(0);

    wrapper.setState({ dropdownOpen: true });
    expect(wrapper.find('.divider')).toHaveLength(1);
  });

  describe('methods', () => {
    let wrapper = null;
    let instance = null;

    beforeEach(() => {
      wrapper = mount(
        <CollapsibleMenu {...props} isLastChild>
          <p>Children</p>
        </CollapsibleMenu>,
      );
      instance = wrapper.instance();
    });

    it('onToggle change state', () => {
      const element = document.createElement('p');
      instance.onToggle({ target: element });
      expect(wrapper.state()).toEqual({ dropdownOpen: false });

      instance.containerTrigger.current = {
        isSameNode: () => false,
      };
      instance.buttonTrigger.current = {
        isSameNode: () => false,
      };
      const isDescendant = stub(CollapsibleMenu, 'isDescendant');
      isDescendant.returns(true);

      instance.onToggle({ target: element });
      expect(isDescendant.called).toBeTruthy();
      expect(wrapper.state()).toEqual({ dropdownOpen: true });
      isDescendant.restore();
    });

    it('onBlur change state', () => {
      const element = document.createElement('p');
      const isDescendant = stub(CollapsibleMenu, 'isDescendant');
      isDescendant.returns(false);

      instance.onBlur({ relatedTarget: element });
      wrapper.setState({ dropdownOpen: true });

      instance.onBlur({ relatedTarget: element });

      expect(isDescendant.called).toBeTruthy();
      expect(wrapper.state()).toEqual({ dropdownOpen: false });
      isDescendant.restore();
    });

    it('isDescendant found parent', () => {
      const parent = 5;
      const child = {
        parentNode: {
          parentNode: 5,
          isSameNode: val => val,
        },
      };
      const result = CollapsibleMenu.isDescendant({ parent, child });
      expect(result).toEqual(true);
    });

    it('isDescendant not found parent', () => {
      const parent = 5;
      const child = {
        parentNode: {
          parentNode: null,
          isSameNode: () => false,
        },
      };
      const result = CollapsibleMenu.isDescendant({ parent, child });
      expect(result).toEqual(false);
    });
  });
});
