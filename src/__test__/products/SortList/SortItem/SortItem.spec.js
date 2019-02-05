/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import SortItem, { changeSort } from 'products/SortList/SortItem/SortItem';

jest.mock('products/SortList/SortItem/SortItem.module.css', () => ({
  selected: 'selected',
}));
jest.mock('products/products.constants', () => ({
  SORT_TYPES: {
    order: {
      ASC: 'ASC',
      DESC: 'DESC',
    },
  },
}));

describe('SortItem component', () => {
  it('Should render', () => {
    const currentOrder = 'ASC';
    const label = 'testLabel';
    const name = 'testName';
    const selected = true;
    const onChangeSort = jest.fn();

    const wrapper = shallow(
      <SortItem
        currentOrder={currentOrder}
        label={label}
        name={name}
        selected={selected}
        onChangeSort={onChangeSort}
      />,
    );

    expect(wrapper.find(ListGroup)).toHaveLength(1);
    expect(wrapper.find(ListGroupItem)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find('img')).toHaveLength(2);

    expect(wrapper.find('.selected')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual(label);

    wrapper.setProps({ selected: false });
    expect(wrapper.find('.selected')).toHaveLength(0);
  });

  it('changeSort', () => {
    const callback = jest.fn();
    const newFunction = changeSort(callback, [2]);
    newFunction();
    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).toEqual([2]);
  });
});
