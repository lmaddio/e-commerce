/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Collapse,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import FilterList from 'products/FilterList/FilterList';

jest.mock('App/components/common/TitleWithCloseButton', () => 'TitleWithCloseButton');
jest.mock('products/FilterList/Filters/CheckboxList', () => 'CheckboxList');
jest.mock('products/FilterList/Filters/NumberList', () => 'NumberList');
jest.mock('products/FilterList/FilterList.module.css', () => ({}));

describe('FilterList component', () => {
  it('Should render with certain classes', () => {
    const setProductsFilter = jest.fn();
    const cleanFilters = jest.fn();
    const usedFilters = {
      price: { min: '10', max: '200' },
      quantity: { min: '20', max: '100' },
      available: false,
    };
    const wrapper = shallow(
      <FilterList
        setProductsFilter={setProductsFilter}
        cleanFilters={cleanFilters}
        usedFilters={usedFilters}
      />,
    );
    expect(wrapper.find(ListGroup)).toHaveLength(2);
    expect(wrapper.find(ListGroupItem)).toHaveLength(2);
    expect(wrapper.find('TitleWithCloseButton')).toHaveLength(1);
    expect(wrapper.find(Collapse)).toHaveLength(1);
    expect(wrapper.find('CheckboxList')).toHaveLength(1);
    expect(wrapper.find('NumberList')).toHaveLength(2);
  });

  describe('methods', () => {
    let setProductsFilter = null;
    let cleanFilters = null;
    let usedFilters = null;
    let wrapper = null;
    let instance = null;

    beforeEach(() => {
      setProductsFilter = jest.fn();
      cleanFilters = jest.fn();
      usedFilters = {
        price: { min: '', max: '' },
        quantity: { min: '', max: '' },
        available: false,
      };
      wrapper = shallow(
        <FilterList
          setProductsFilter={setProductsFilter}
          cleanFilters={cleanFilters}
          usedFilters={usedFilters}
        />,
      );
      instance = wrapper.instance();
    });

    it('cleanFilters to not be called if all values are falsy', () => {
      instance.cleanFilters();
      expect(cleanFilters).not.toBeCalled();
    });

    it('cleanFilters be called if any price is truthy', () => {
      wrapper.setProps({ usedFilters: { ...usedFilters, price: { min: '2', max: '' } } });
      instance.cleanFilters();
      expect(cleanFilters).toBeCalled();
    });

    it('cleanFilters be called if any quantity is truthy', () => {
      wrapper.setProps({ usedFilters: { ...usedFilters, quantity: { min: '2', max: '' } } });
      instance.cleanFilters();
      expect(cleanFilters).toBeCalled();
    });

    it('cleanFilters be called if any available is truthy', () => {
      wrapper.setProps({ usedFilters: { ...usedFilters, available: true } });
      instance.cleanFilters();
      expect(cleanFilters).toBeCalled();
    });

    it('toggleDisplayFilter', () => {
      expect(wrapper.state()).toEqual({ displayFilter: false });
      instance.toggleDisplayFilter();
      expect(wrapper.state()).toEqual({ displayFilter: true });
    });
  });
});
