/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Collapse,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import SortList from 'products/SortList/SortList';

jest.mock('App/components/common/TitleWithCloseButton', () => 'TitleWithCloseButton');
jest.mock('products/SortList/SortItem/SortItem', () => 'SortItem');
jest.mock('products/SortList/SortList.module.css', () => ({}));

describe('SortList component', () => {
  it('Should render', () => {
    const setProductsSort = jest.fn();
    const cleanProductsSort = jest.fn();
    const sort = { field: 'field', order: 'ASC' };
    const sortTypes = {
      fields: {
        QUANTITY: {
          label: 'Quantity',
          name: 'quantity',
        },
        PRICE: {
          label: 'Price',
          name: 'price',
        },
      },
      order: 'ASC',
    };
    const isLoading = false;

    const wrapper = shallow(
      <SortList
        setProductsSort={setProductsSort}
        cleanProductsSort={cleanProductsSort}
        sort={sort}
        sortTypes={sortTypes}
        isLoading={isLoading}
      />,
    );
    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find(ListGroup)).toHaveLength(1);
    expect(wrapper.find(Collapse)).toHaveLength(1);
    expect(wrapper.find(ListGroupItem)).toHaveLength(2);
    expect(wrapper.find('TitleWithCloseButton')).toHaveLength(1);
    expect(wrapper.find('SortItem')).toHaveLength(2);
  });

  describe('methods', () => {
    let wrapper = null;
    let instance = null;
    let setProductsSort = null;
    let cleanProductsSort = null;
    let sort = null;
    const sortTypes = {
      fields: {
        QUANTITY: {
          label: 'Quantity',
          name: 'quantity',
        },
        PRICE: {
          label: 'Price',
          name: 'price',
        },
      },
      default: {
        field: 'field',
        order: 'ASC',
      },
    };
    let isLoading = null;

    beforeEach(() => {
      setProductsSort = jest.fn();
      cleanProductsSort = jest.fn();
      sort = { field: 'field', order: 'ASC' };
      isLoading = true;
      wrapper = shallow(
        <SortList
          setProductsSort={setProductsSort}
          cleanProductsSort={cleanProductsSort}
          sort={sort}
          sortTypes={sortTypes}
          isLoading={isLoading}
        />,
      );
      instance = wrapper.instance();
    });

    it('cleanSort to not be called if fields are equal to default', () => {
      instance.cleanSort();
      expect(cleanProductsSort).not.toBeCalled();
    });

    it('cleanSort be called if order change', () => {
      wrapper.setProps({ sortTypes, sort: { order: 'DESC', field: 'field' } });
      instance.cleanSort();
      expect(cleanProductsSort).toBeCalled();
    });

    it('cleanSort be called if field change', () => {
      wrapper.setProps({ sortTypes, sort: { order: 'ASC', field: 'field2' } });
      instance.cleanSort();
      expect(cleanProductsSort).toBeCalled();
    });

    it('onChangeSort to not be called if fields are equal to default', () => {
      instance.onChangeSort({ field: 'field', order: 'ASC' });
      expect(setProductsSort).not.toBeCalled();
    });

    it('onChangeSort be called if order change', () => {
      wrapper.setProps({ sortTypes, sort: { order: 'DESC', field: 'field' } });
      instance.onChangeSort({ field: 'field', order: 'ASC' });
      expect(setProductsSort).toBeCalled();
    });

    it('onChangeSort be called if field change', () => {
      wrapper.setProps({ sortTypes, sort: { order: 'ASC', field: 'field2' } });
      instance.onChangeSort({ field: 'field', order: 'ASC' });
      expect(setProductsSort).toBeCalled();
    });

    it('toggleDisplaySort', () => {
      expect(wrapper.state()).toEqual({ displaySort: false });
      instance.toggleDisplaySort();
      expect(wrapper.state()).toEqual({ displaySort: true });
    });
  });
});
